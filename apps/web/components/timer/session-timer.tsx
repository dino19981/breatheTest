"use client";

import { useEffect, useState, useRef } from "react";
import { GlassBlock } from "@workspace/ui/components/glass-block";
import { useSession } from "@/providers/session-provider";

export function SessionTimer() {
  const { active, sessionStartRef, paused } = useSession();

  const [elapsed, setElapsed] = useState(0);

  const pauseStartedRef = useRef<number | null>(null);
  const totalPauseRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!active || !sessionStartRef.current) {
      setElapsed(0);
      pauseStartedRef.current = null;
      totalPauseRef.current = 0;
      clearInterval(intervalRef.current as any);
      return;
    }

    if (paused) {
      pauseStartedRef.current = Date.now();
      clearInterval(intervalRef.current as any);
      return;
    }

    if (pauseStartedRef.current) {
      const now = Date.now();
      totalPauseRef.current += now - pauseStartedRef.current;
      pauseStartedRef.current = null;
    }

    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const raw = now - sessionStartRef.current - totalPauseRef.current;
      setElapsed(Math.floor(raw / 1000));
    }, 1000);

    return () => clearInterval(intervalRef.current as any);
  }, [active, sessionStartRef.current, paused]);

  const format = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="select-none">
      <GlassBlock className="w-[88px] h-[36px] rounded-full flex items-center justify-center">
        <span className="text-sm font-semibold text-[#525263]">
          {format(elapsed)}
        </span>
      </GlassBlock>
    </div>
  );
}
