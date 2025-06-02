"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export const useCountdown = () => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setCountdown(null);
  }, []);

  const start = useCallback((seconds: number, onFinish?: () => void) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    setCountdown(seconds);
    let counter = seconds;

    intervalRef.current = setInterval(() => {
      counter -= 1;
      if (counter === 0) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setCountdown(null);
        onFinish?.();
      } else {
        setCountdown(counter);
      }
    }, 1_000);
  }, []);

  useEffect(() => () => reset(), [reset]);

  return { countdown, start, reset };
};
