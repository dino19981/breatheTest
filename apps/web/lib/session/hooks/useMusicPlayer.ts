import { useState, useEffect, useRef } from "react";

export const useMusicPlayer = (active: boolean) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicMuted, setMusicMuted] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;

    if (active) {
      audioRef.current
        .play()
        .then(() => setMusicPlaying(true))
        .catch(console.error);
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setMusicPlaying(false);
    }
  }, [active]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = musicMuted;
    }
  }, [musicMuted]);

  return { audioRef, musicMuted, setMusicMuted, musicPlaying };
};
