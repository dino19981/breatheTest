export function isAppleDevice(): boolean {
  if (typeof window === "undefined") return false;

  const userAgent = window.navigator.userAgent.toLowerCase();
  return (
    /iphone|ipad|ipod|macintosh/.test(userAgent) ||
    (!!navigator.maxTouchPoints &&
      navigator.maxTouchPoints > 2 &&
      /macintosh/.test(userAgent))
  );
}

export function isIosDevice(): boolean {
  if (typeof window === "undefined") return false;
  return /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
}

export function isSafari(): boolean {
  if (typeof window === "undefined") return false;
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /^((?!chrome|android).)*safari/i.test(userAgent);
}

export const vibrateShort = () => {
  navigator.vibrate?.(50);
};

export const isEchoCancellationSupported =
  navigator?.mediaDevices?.getSupportedConstraints().echoCancellation;

export const isNoiseSuppressionSupported =
  navigator?.mediaDevices?.getSupportedConstraints().noiseSuppression;

export const isAutoGainControlSupported =
  navigator?.mediaDevices?.getSupportedConstraints().autoGainControl;
