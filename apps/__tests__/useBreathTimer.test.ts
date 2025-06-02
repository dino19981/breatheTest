import { act, renderHook } from "@testing-library/react";
import {
  useBreathTimer,
  TOLERANCE_RATIO,
} from "../../apps/web/app/session/hooks/useBreathTimer";

beforeAll(() => {
  jest.useFakeTimers();
});

describe("useBreathTimer", () => {
  it("Goes through all phases of the full protocol.", () => {
    const { result } = renderHook(() => useBreathTimer(true, false, "Focus"));

    act(() => jest.advanceTimersByTime(4000));
    expect(result.current.phase).toBe("hold");

    act(() => jest.advanceTimersByTime(4000));
    expect(result.current.phase).toBe("exhale");

    act(() => jest.advanceTimersByTime(4000));
    expect(result.current.phase).toBe("holdWithout");
  });

  it("Resets to inhale on inactive.", () => {
    const { result, rerender } = renderHook(
      ({ active }) => useBreathTimer(active),
      { initialProps: { active: true } },
    );

    act(() => jest.advanceTimersByTime(4000));
    expect(result.current.phase).toBe("hold");

    rerender({ active: false });
    expect(result.current.phase).toBe("inhale");
  });
});
