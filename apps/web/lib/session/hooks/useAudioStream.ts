import { defaultInputDeviceSampleRate } from "@/lib/constants";
import {
  isAutoGainControlSupported,
  isEchoCancellationSupported,
  isNoiseSuppressionSupported,
} from "@/utils/device";
import { useCallback, useRef, useState } from "react";

interface UseAudioStreamProps {
  echoCancellation: boolean;
  noiseSuppression: boolean;
  autoGainControl: boolean;
  voiceIsolation: boolean;
}

export function useAudioStream({
  echoCancellation,
  noiseSuppression,
  autoGainControl,
}: UseAudioStreamProps) {
  const audioStreamRef = useRef<MediaStream | null>(null);

  const startAudioStream = useCallback(async () => {
    if (audioStreamRef.current) return;
    console.log(
      navigator.mediaDevices,
      "navigator.mediaDevices",
      location.protocol,
    );

    audioStreamRef.current = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        echoCancellation: echoCancellation && isEchoCancellationSupported,
        noiseSuppression: noiseSuppression && isNoiseSuppressionSupported,
        autoGainControl: autoGainControl && isAutoGainControlSupported,
      },
    });

    const track = audioStreamRef.current?.getAudioTracks()?.[0];
    const streamInputSampleRate = track?.getSettings()?.sampleRate;

    return streamInputSampleRate ?? defaultInputDeviceSampleRate;
  }, [
    echoCancellation,
    noiseSuppression,
    autoGainControl,
    audioStreamRef.current,
  ]);

  return {
    startAudioStream,
    audioStreamRef,
  };
}
