export class FakeAudioElement {
  paused = true;
  muted = false;
  currentTime = 0;
  src = "";
  play = jest.fn().mockImplementation(() => {
    this.paused = false;
    return Promise.resolve();
  });
  pause = jest.fn().mockImplementation(() => {
    this.paused = true;
  });
  load = jest.fn();
}

export function mockAudio() {
  (globalThis as any).Audio = FakeAudioElement;
}
