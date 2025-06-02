import { renderHook, act } from "@testing-library/react";
import { useAudioRecorder } from "../../apps/web/app/session/hooks/useAudioRecorder";
import {
  FakeAudioContext,
  FakeAudioWorkletNode,
  mockGetUserMedia,
  lastWorklet,
  ctxInstance,
} from "../testUtils/mediaMocks";

beforeAll(() => {
  (globalThis as any).AudioContext = FakeAudioContext;
  (globalThis as any).AudioWorkletNode = FakeAudioWorkletNode;
  mockGetUserMedia();
});

test("Starts, sends chunks, and shuts down.", async () => {
  const onChunk = jest.fn();
  const onPerm = jest.fn();

  const { rerender, unmount } = renderHook(
    ({ active }) => useAudioRecorder(active, onChunk, onPerm),
    { initialProps: { active: false } },
  );

  await act(async () => {
    rerender({ active: true });
    await Promise.resolve();
  });
  expect(onPerm).toHaveBeenCalledWith(true);

  const buf = new ArrayBuffer(8);
  lastWorklet!.port.onmessage({ data: buf } as any);
  expect(onChunk).toHaveBeenCalledWith(buf);

  await act(async () => {
    rerender({ active: false });
    await Promise.resolve();
  });
  expect(ctxInstance!.close).toHaveBeenCalled();

  act(() => unmount());
});
