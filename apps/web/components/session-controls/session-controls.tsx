"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@workspace/ui/components/dialog";
import { GlassBlock } from "@workspace/ui/components/glass-block";
import { Volume2, VolumeX, Pause, Play, Square, Vibrate } from "lucide-react";

import { useState } from "react";
import { t } from "@lingui/core/macro";
import { useSession } from "@/providers/session-provider";

interface SessionControlButtonsProps {
  active: boolean;
  paused: boolean;
  triggerSessionStart: () => void;
  togglePause: () => void;
  setOpen: (open: boolean) => void;
}

function SessionControlButtons({
  active,
  paused,
  triggerSessionStart,
  togglePause,
  setOpen,
}: SessionControlButtonsProps) {
  if (!active) {
    return (
      <button
        onClick={triggerSessionStart}
        aria-label={t`Start session`}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-foreground/30 text-foreground/70 hover:bg-white/10 transition"
      >
        <Play className="w-5 h-5" />
      </button>
    );
  }

  if (!paused) {
    return (
      <button
        onClick={togglePause}
        aria-label={t`Pause`}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-foreground/30 text-foreground/70 hover:bg-white/10 transition"
      >
        <Pause className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={togglePause}
        aria-label={t`Resume`}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-foreground/30 text-foreground/70 hover:bg-white/10 transition"
      >
        <Play className="w-5 h-5" />
      </button>

      <button
        onClick={() => setOpen(true)}
        aria-label={t`Stop session`}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-foreground/30 text-foreground/70 hover:bg-white/10 transition"
      >
        <Square className="w-5 h-5" />
      </button>
    </div>
  );
}

export function SessionControls() {
  const {
    active,
    paused,
    setPaused,
    triggerSessionStart,
    stopSession,
    musicMuted,
    setMusicMuted,
  } = useSession();

  function toggleMusicMute() {
    setMusicMuted(!musicMuted);
  }

  const [open, setOpen] = useState(false);

  const togglePause = () => setPaused(!paused);

  return (
    <>
      <GlassBlock className="w-full max-w-[340px] h-[72px] rounded-[24px] flex items-center justify-around px-4 bg-white/5 backdrop-blur-sm">
        <button
          aria-label={t`Vibrate`}
          className="w-10 h-10 flex items-center justify-center rounded-full text-foreground/70 hover:bg-white/10 transition"
        >
          <Vibrate className="w-5 h-5" />
        </button>

        <SessionControlButtons
          active={active}
          paused={paused}
          triggerSessionStart={triggerSessionStart}
          togglePause={togglePause}
          setOpen={setOpen}
        />

        <button
          onClick={toggleMusicMute}
          aria-label={t`Toggle Music`}
          className="w-10 h-10 flex items-center justify-center rounded-full text-foreground/70 hover:bg-white/10 transition"
        >
          {musicMuted ? (
            <VolumeX className="w-5 h-5 text-destructive" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>
      </GlassBlock>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[360px] bg-background border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">{t`End session?`}</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {t`Are you sure you want to stop? Your progress will be saved.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2 pt-4">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-lg bg-muted text-muted-foreground text-sm hover:bg-muted/80 transition"
            >
              {t`Cancel`}
            </button>
            <button
              onClick={() => {
                setOpen(false);
                stopSession();
              }}
              className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm hover:bg-destructive/90 transition"
            >
              {t`Stop`}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
