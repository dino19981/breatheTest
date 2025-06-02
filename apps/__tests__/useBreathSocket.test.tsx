import { useBreathSocket } from "../../apps/web/app/session/hooks/useBreathSocket";
import { act, renderHook, waitFor } from "@testing-library/react";

class FakeWebSocket {
  static CONNECTING = 0 as const;
  static OPEN = 1 as const;
  static CLOSING = 2 as const;
  static CLOSED = 3 as const;

  static instances: FakeWebSocket[] = [];

  readyState: 0 | 1 | 2 | 3 = FakeWebSocket.CONNECTING;
  url: string;
  sent: unknown[] = [];

  onopen: ((ev: Event) => any) | null = null;
  onmessage: ((ev: MessageEvent) => any) | null = null;
  onclose: ((ev: CloseEvent) => any) | null = null;

  constructor(url: string) {
    this.url = url;
    FakeWebSocket.instances.push(this);
    setTimeout(() => {
      this.readyState = FakeWebSocket.OPEN;
      this.onopen?.(new Event("open"));
    }, 0);
  }

  send(data: unknown) {
    if (this.readyState !== FakeWebSocket.OPEN) throw new Error("not open");
    this.sent.push(data);
  }

  close() {
    if (this.readyState === FakeWebSocket.CLOSED) return;
    this.readyState = FakeWebSocket.CLOSED;
    this.onclose?.(new CloseEvent("close"));
  }

  __mockReceive(payload: unknown) {
    if (this.readyState !== FakeWebSocket.OPEN) return;
    this.onmessage?.(
      new MessageEvent("message", { data: JSON.stringify(payload) }),
    );
  }

  __dispose() {
    this.onopen = this.onmessage = this.onclose = null;
  }
}

(globalThis as any).WebSocket = FakeWebSocket;

afterEach(() => {
  FakeWebSocket.instances.forEach((ws) => ws.__dispose());
  FakeWebSocket.instances.length = 0;
});
test("Connects and disconnects without extra sockets", async () => {
  const { result, unmount } = renderHook(() => useBreathSocket());

  act(() => result.current.connectSocket());
  await waitFor(() => expect(result.current.socketStatus).toBe("Connected"));

  expect(FakeWebSocket.instances).toHaveLength(1);
  const ws = FakeWebSocket.instances[0]!;

  act(() => result.current.disconnectSocket());
  expect(result.current.socketStatus).toBe("Closed");
  expect(ws.readyState).toBe(FakeWebSocket.CLOSED);

  unmount();
});

test("Doesn't create a new socket on subsequent calls.", async () => {
  const { result } = renderHook(() => useBreathSocket());

  act(() => {
    result.current.connectSocket();
    result.current.connectSocket();
  });

  await waitFor(() => expect(result.current.socketStatus).toBe("Connected"));

  expect(FakeWebSocket.instances).toHaveLength(1);
});

test("sendAudioData sends data only when the socket is open.", async () => {
  const { result } = renderHook(() => useBreathSocket());

  act(() => result.current.connectSocket());
  await waitFor(() => expect(result.current.socketStatus).toBe("Connected"));

  const ws = FakeWebSocket.instances[0];
  expect(ws).toBeDefined();

  const buffer = new ArrayBuffer(8);
  act(() => result.current.sendAudioData(buffer));

  expect(ws!.sent).toContain(buffer);
});
