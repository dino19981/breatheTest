"use client";

import { RefObject, useCallback, useEffect, useMemo, useRef } from "react";
import { isSafari } from "@/utils/device";
import { getSupportedMimeType } from "./utils/get-supported-myme-type";

interface UseAudioRecorderProps {
  paused: boolean;
  onChunk: (buf: ArrayBuffer) => void;
  onPermissionResult?: (granted: boolean) => void;
  audioStreamRef: RefObject<MediaStream | null>;
}

export function useAudioRecorder({
  paused,
  onChunk,
  onPermissionResult,
  audioStreamRef,
}: UseAudioRecorderProps) {
  const ctxRef = useRef<AudioContext | null>(null);
  const workletRef = useRef<AudioWorkletNode | null>(null);
  const isRecordingRef = useRef(false);
  const permissionHandledRef = useRef(false);
  const pausedRef = useRef<boolean>(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const { mimeType, type } = useMemo(() => getSupportedMimeType(), []);

  const stopRecording = useCallback(async () => {
    if (!isRecordingRef.current) return;
    isRecordingRef.current = false;

    try {
      // First disconnect the worklet to stop processing
      if (workletRef.current) {
        workletRef.current.disconnect();
        workletRef.current = null;
      }

      // Then stop all tracks
      if (audioStreamRef.current) {
        const tracks = audioStreamRef.current.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });

        audioStreamRef.current = null;
      }

      // Finally close the AudioContext
      if (ctxRef.current) {
        await ctxRef.current.close();
        ctxRef.current = null;
      }
    } catch (e) {
      console.warn("[AudioRecorder] Error during cleanup:", e);
    }
  }, [workletRef, audioStreamRef, ctxRef, isRecordingRef]);

  const startRecording = useCallback(async () => {
    try {
      if (!audioStreamRef.current) return;

      ctxRef.current = new AudioContext();

      const mediaRecorder = new MediaRecorder(audioStreamRef.current, {
        mimeType,
      });

      mediaRecorder.start();
      mediaRecorder.ondataavailable = (event) => {
        console.log("dataavailable", event);
      };

      await ctxRef.current.audioWorklet.addModule("/recorder-worklet.js");

      const streamSource = ctxRef.current.createMediaStreamSource(
        audioStreamRef.current,
      );

      workletRef.current = new AudioWorkletNode(
        ctxRef.current,
        "recorder-processor",
        {
          // Safari-specific processor options
          processorOptions: isSafari()
            ? {
                bufferSize: 2048, // Larger buffer size for Safari
              }
            : undefined,
        },
      );

      workletRef.current.port.onmessage = (event) => {
        if (!isRecordingRef.current || pausedRef.current) return;
        const chunk = event.data as ArrayBuffer;
        onChunk(chunk);
      };

      streamSource.connect(workletRef.current);
      workletRef.current.connect(ctxRef.current.destination);

      isRecordingRef.current = true;

      if (!permissionHandledRef.current) {
        permissionHandledRef.current = true;
        onPermissionResult?.(true);
      }
    } catch (err) {
      console.error("[AudioRecorder] ❌ Failed to start:", err);
      if (!permissionHandledRef.current) {
        permissionHandledRef.current = true;
        onPermissionResult?.(false);
      }
    }
  }, [
    workletRef,
    audioStreamRef,
    ctxRef,
    isRecordingRef,
    permissionHandledRef,
    onPermissionResult,
    onChunk,
  ]);

  return {
    startRecording,
    stopRecording,
  };
}
