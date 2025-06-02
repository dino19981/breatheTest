import { renderHook, act, waitFor } from "@testing-library/react";
import { useMusicPlayer } from "../../apps/web/app/session/hooks/useMusicPlayer";

describe("useMusicPlayer", () => {
  it("Stores audioRef and correctly toggles mute.", () => {
    const { result, rerender } = renderHook(
      ({ active }) => useMusicPlayer(active),
      { initialProps: { active: false } },
    );

    expect(result.current.audioRef.current).toBeNull();
    expect(result.current.musicMuted).toBe(false);

    act(() => result.current.setMusicMuted(true));
    expect(result.current.musicMuted).toBe(true);

    rerender({ active: true });
    rerender({ active: false });
  });
});
