"use client";
import { useEffect } from "react";

export function OneSignalInit({ appId }: { appId: string }) {
  useEffect(() => {
    window.OneSignalDeferred = window.OneSignalDeferred || [];

    window.OneSignalDeferred.push(async (OneSignal: any) => {
      OneSignal.Debug.setLogLevel("error");

      try {
        await OneSignal.init({
          appId,
          allowLocalhostAsSecureOrigin: true,
          serviceWorkerPath: "/OneSignalSDKWorker.js",
          serviceWorkerUpdaterPath: "/OneSignalSDKUpdaterWorker.js",
          promptOptions: { slidedown: { enabled: true } },
        });
      } catch (e) {
        console.error("❌ OneSignal init error:", e);
        return;
      }

      const state = await OneSignal.getDeviceState();
      if (!state.isSubscribed) {
        await OneSignal.showSlidedownPrompt();
      }
    });

    const script = document.createElement("script");
    script.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
    script.async = true;
    document.head.appendChild(script);
  }, [appId]);

  return null;
}
