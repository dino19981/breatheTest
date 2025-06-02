"use client";

import { BreathCircle } from "@/components/breath-circle/breath-circle";
import { SessionControls } from "@/components/session-controls/session-controls";
import { SessionHeaderMenu } from "@/components/session-header/session-header";
import { SessionTimer } from "@/components/timer/session-timer";
import { useSession } from "@/providers/session-provider";

export default function SessionPage() {
  const { audioRef, musicMuted } = useSession();

  return (
    <div className="flex flex-col items-center px-4 min-h-[calc(100dvh-52px)]">
      <div className="w-full flex flex-col items-center flex-1 md:flex-none">
        <div className="flex flex-col items-center justify-between gap-2 md:gap-8 w-full pb-4 flex-1">
          <SessionHeaderMenu />

          <BreathCircle />

          <div className="w-full flex flex-col items-center justify-center gap-5">
            <div className="flex flex-col items-center justify-center gap-2">
              <SessionTimer />
            </div>

            <SessionControls />
          </div>
        </div>
      </div>

      <audio ref={audioRef} src="/audio/music.mp3" loop muted={musicMuted} />
    </div>
  );
}
