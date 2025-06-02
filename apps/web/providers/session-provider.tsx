"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSocketEnabled } from "@/store/audioSettingsSlice";
import { useBreathSocket } from "@/lib/session/hooks/useBreathSocket";
import { useAudioRecorder } from "@/lib/session/hooks/useAudioRecorder";
import { useAudioRecorder2 } from "@/lib/session/hooks/useAudioRecorder2";
import {
  BreathPhase,
  useBreathTimer,
} from "@/lib/session/hooks/useBreathTimer";
import { useCountdown } from "@/lib/session/hooks/useCountdown";
import { useMicPermission } from "@/lib/session/hooks/useMicPermission";
import { useMusicPlayer } from "@/lib/session/hooks/useMusicPlayer";
import { useSessionSaver } from "@/lib/session/hooks/useSessionSaver";
import { protocols, ProtocolName } from "@/lib/session/hooks/useBreathTimer";
import {
  defaultInputDeviceSampleRate,
  defaultMaxSessionLengthInMinutes,
} from "@/lib/constants";
import { setSessionActive } from "@/store/sessionsSlice";
import { Phase } from "@/components/breath-circle/utils";
import { useAudioStream } from "@/lib/session/hooks/useAudioStream";
import { differenceInMinutes, differenceInSeconds } from "date-fns";

interface SessionContextType {
  isSessionActive: boolean;
  active: boolean;
  paused: boolean;
  recordingEnabled: boolean;
  waitingForSocket: boolean;
  selectedProtocolName: ProtocolName;
  selectedProtocol: (typeof protocols)[ProtocolName];
  protocolPreview: Record<string, number>;
  countdown: number | null;
  phase: Phase | null;
  phaseAt: (offsetMs: number) => BreathPhase;
  currentPhaseDuration: number;
  musicMuted: boolean;
  setMusicMuted: (muted: boolean) => void;
  triggerSessionStart: () => Promise<void>;
  stopSession: () => void;
  setPaused: (paused: boolean) => void;
  setSelectedProtocolName: (name: ProtocolName) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  prediction: number | null;
  predictionIdx: number | null;
  predictionLabel: string | null;
  socketEnabled: boolean;
  socketStatus: string;
  sessionStartRef: React.RefObject<number>;
  startSession: (actualSampleRate: number) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const sessionDurationCheckInterval = 1000 * 30;

export function SessionProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const {
    socketEnabled,
    echoCancellation,
    noiseSuppression,
    autoGainControl,
    recordEnabled,
  } = useAppSelector((state) => state.audioSettings);

  const [active, setActive] = useState(false);
  const [waitingForSocket, setWaitingForSocket] = useState(false);
  const [recordingEnabled, setRecordingEnabled] = useState(false);
  const [paused, setPaused] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [sessionStartedAt, setSessionStartedAt] = useState<number | null>(null);

  const [selectedProtocolName, setSelectedProtocolName] =
    useState<ProtocolName>("Focus");

  const selectedProtocol = protocols[selectedProtocolName];
  const protocolPreview = Object.fromEntries(
    Object.entries(selectedProtocol).map(([k, v]) => [k, Math.round(v / 1000)]),
  );

  const { countdown, start: startCountdown } = useCountdown();
  const { audioRef, musicMuted, setMusicMuted } = useMusicPlayer(active);
  const { request: requestMic } = useMicPermission();

  const { phase, phaseAt } = useBreathTimer(
    active,
    paused,
    selectedProtocolName,
  );

  const { startAudioStream, audioStreamRef } = useAudioStream({
    echoCancellation,
    noiseSuppression,
    autoGainControl,
    voiceIsolation: false,
  });

  const {
    socketStatus,
    sendAudioData,
    getSessionEvents,
    connectSocket,
    disconnectSocket,
    prediction,
    predictionIdx,
    predictionLabel,
  } = useBreathSocket({ currentPhase: phase });

  const sessionStartRef = useRef(0);

  const { startRecording, stopRecording } = useAudioRecorder2({
    paused,
    onChunk: sendAudioData,
    audioStreamRef,
  });

  const triggerSessionStart = async () => {
    if (active || countdown !== null) return;
    // await requestMic();
    const actualSampleRate = await startAudioStream();

    connectSocket({
      skipRecording: !recordEnabled,
      inputDeviceSampleRate: actualSampleRate ?? defaultInputDeviceSampleRate,
    });

    startCountdown(3, () =>
      startSession(actualSampleRate ?? defaultInputDeviceSampleRate),
    );
  };

  const startSession = (actualSampleRate: number) => {
    if (active) return;
    setSessionStartedAt(Date.now());

    startRecording();

    dispatch(setSessionActive(true));
    setRecordingEnabled(true);

    if (socketEnabled && socketStatus === "Connecting") {
      sessionStartRef.current = Date.now();
      setActive(true);
      return;
    }

    // if (socketEnabled && socketStatus !== "Connected") {
    //   connectSocket({
    //     skipRecording: !recordEnabled,
    //     inputDeviceSampleRate: actualSampleRate,
    //   });
    // }

    sessionStartRef.current = Date.now();
    setActive(true);
  };

  const saveSession = useSessionSaver({
    socketEnabled,
    getSessionEvents,
    phaseAt,
    protocolName: selectedProtocolName,
    sessionStart: sessionStartRef.current,
  });

  const stopSession = () => {
    stopRecording();
    setRecordingEnabled(false);
    setPaused(false);
    setResetKey((k) => k + 1);

    saveSession();
    if (socketEnabled) disconnectSocket();

    dispatch(setSessionActive(false));
    setActive(false);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (active && !paused && !musicMuted) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [active, paused, musicMuted]);

  useEffect(() => {
    if (!active || !sessionStartedAt) return;

    const checkSessionDuration = () => {
      const minutesElapsed = differenceInMinutes(Date.now(), sessionStartedAt);
      if (minutesElapsed >= defaultMaxSessionLengthInMinutes) {
        stopSession();
      }
    };

    const interval = setInterval(
      checkSessionDuration,
      sessionDurationCheckInterval,
    );
    return () => clearInterval(interval);
  }, [active, sessionStartedAt]);

  // useEffect(() => {
  //   if (socketStatus === "Error") {
  //     dispatch(setSocketEnabled(false));
  //     setWaitingForSocket(false);
  //   }
  // }, [socketStatus, dispatch]);

  // useEffect(() => {
  //   if (!socketEnabled) return;
  //   if (waitingForSocket && socketStatus === "Connected") {
  //     sessionStartRef.current = Date.now();
  //     setActive(true);
  //     setWaitingForSocket(false);
  //   }
  // }, [socketStatus, waitingForSocket, socketEnabled]);

  // useEffect(() => {
  //   if (socketEnabled && active && socketStatus !== "Connected")
  //     connectSocket({
  //       skipRecording: !recordEnabled,
  //       inputDeviceSampleRate,
  //     });
  // }, [socketEnabled, active, socketStatus]);

  // useEffect(() => {
  //   if (!socketEnabled && socketStatus === "Connected") {
  //     disconnectSocket();
  //     setWaitingForSocket(false);
  //   }
  // }, [socketEnabled, socketStatus]);

  const currentPhaseDuration = useMemo(() => {
    const getPhaseDuration = (): number => {
      if (!active || !phase) return 0;

      const hasPhase = phase in selectedProtocol;
      if (!hasPhase) return 0;

      return selectedProtocol[phase as keyof typeof selectedProtocol];
    };

    return getPhaseDuration();
  }, [active, phase, selectedProtocol]);

  const value = {
    isSessionActive: active,
    active,
    paused,
    recordingEnabled,
    waitingForSocket,
    selectedProtocolName,
    selectedProtocol,
    protocolPreview,
    countdown,
    phase,
    phaseAt,
    currentPhaseDuration,
    musicMuted,
    setMusicMuted,
    triggerSessionStart,
    stopSession,
    setPaused,
    setSelectedProtocolName,
    audioRef,
    prediction,
    predictionIdx,
    predictionLabel,
    socketEnabled,
    socketStatus,
    sessionStartRef,
    startSession,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
