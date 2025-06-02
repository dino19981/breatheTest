import { act, renderHook } from "@testing-library/react";
import { useCountdown } from "../../apps/web/app/session/hooks/useCountdown";

beforeAll(() => {
  jest.useFakeTimers();
});

test("countdown", () => {
  const { result } = renderHook(() => useCountdown());

  act(() => result.current.start(3));
  expect(result.current.countdown).toBe(3);

  act(() => jest.advanceTimersByTime(1000));
  expect(result.current.countdown).toBe(2);

  act(() => jest.advanceTimersByTime(2000));
  expect(result.current.countdown).toBeNull();

  act(() => result.current.start(2));
  act(() => jest.advanceTimersByTime(1000));
  act(() => result.current.reset());
  expect(result.current.countdown).toBeNull();
});
