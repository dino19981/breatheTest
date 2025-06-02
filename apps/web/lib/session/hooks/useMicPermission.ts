"use client";

import { useState, useCallback } from "react";

export type MicPermissionStatus = "unknown" | "granted" | "denied";

export function useMicPermission() {
  const [status, setStatus] = useState<MicPermissionStatus>("unknown");

  const request = useCallback(async () => {
    if (status !== "unknown") return status === "granted";
    console.log("requestrequestrequest");

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setStatus("granted");
      return true;
    } catch (err) {
      console.error("[useMicPermission] ❌ Permission denied:", err);
      setStatus("denied");
      return false;
    }
  }, [status]);

  return { status, request };
}
