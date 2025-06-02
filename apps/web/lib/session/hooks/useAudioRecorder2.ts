"use client";

import { RefObject, useCallback, useEffect, useMemo, useRef } from "react";
import { isSafari } from "@/utils/device";
import { getSupportedMimeType } from "./utils/get-supported-myme-type";

const INTERVAL_FOR_SEND_CHUNKS = 200;

interface UseAudioRecorderProps {
  paused: boolean;
  onChunk: (buf: ArrayBuffer) => void;
  onPermissionResult?: (granted: boolean) => void;
  audioStreamRef: RefObject<MediaStream | null>;
}

export function useAudioRecorder2({
  paused,
  onChunk,
  onPermissionResult,
  audioStreamRef,
}: UseAudioRecorderProps) {
  const audioChunksRef = useRef<any>([]);
  const mediaRecorderRef = useRef<any>(null);
  const isRecordingRef = useRef(false);
  const permissionHandledRef = useRef(false);
  const pausedRef = useRef<boolean>(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const { mimeType, type } = useMemo(() => getSupportedMimeType(), []);

  const playRecording = () => {
    console.log(audioChunksRef.current.length, "audioChunksRef.current");

    if (audioChunksRef.current.length === 0) return;

    const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  };

  const stopRecording = useCallback(async () => {
    if (!isRecordingRef.current) return;

    isRecordingRef.current = false;

    try {
      // Stop recorder
      mediaRecorderRef.current.stop();

      setTimeout(playRecording, INTERVAL_FOR_SEND_CHUNKS + 1);

      // Stop all tracks
      if (audioStreamRef.current) {
        audioStreamRef.current?.getTracks().forEach((track) => track.stop());
        audioStreamRef.current = null;
      }
    } catch (e) {
      console.warn("[AudioRecorder] Error during cleanup:", e);
    }
  }, [audioStreamRef, isRecordingRef]);

  const startRecording = useCallback(async () => {
    try {
      if (!audioStreamRef.current) return;

      const mediaRecorder = new MediaRecorder(audioStreamRef.current, {
        mimeType,
      });

      mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
          const arrayBuffer = await event.data.arrayBuffer();
          onChunk(arrayBuffer);
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(INTERVAL_FOR_SEND_CHUNKS);

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
    audioStreamRef,
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
