/* apps/testUtils/mediaMocks.ts --------------------------------------- */
export class FakeMediaStreamTrack {
  stop = jest.fn();
}
export class FakeMediaStream {
  private track = new FakeMediaStreamTrack();
  getTracks() {
    return [this.track];
  }
}

/* ---------- navigator.mediaDevices.getUserMedia ---------- */
export function mockGetUserMedia() {
  (globalThis.navigator.mediaDevices as any) = {
    getUserMedia: jest.fn().mockResolvedValue(new FakeMediaStream()),
  };
}

/* ---------- Web‑Audio API ---------- */
export let ctxInstance: FakeAudioContext | null = null;
export let lastWorklet: FakeAudioWorkletNode | null = null;

export class FakeAudioWorkletNode {
  port = { onmessage: (_ev: MessageEvent) => {} };
  constructor() {
    lastWorklet = this;
  }
  connect = jest.fn();
  disconnect = jest.fn();
}

export class FakeAudioContext {
  destination = {};
  closed = false;

  audioWorklet = {
    addModule: jest.fn().mockResolvedValue(undefined),
  };
  createMediaStreamSource = jest.fn().mockReturnValue({
    connect: jest.fn(),
    disconnect: jest.fn(),
  });

  constructor() {
    ctxInstance = this;
  }
  close = jest.fn().mockImplementation(async () => {
    this.closed = true;
  });
}
