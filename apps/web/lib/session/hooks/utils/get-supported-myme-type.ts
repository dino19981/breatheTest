import { isSafari } from "@/utils/device";

export function getSupportedMimeType() {
  const result = {
    mimeType: "audio/webm",
    type: "webm",
  };

  if (isSafari()) {
    result.mimeType = "audio/mp4";
    result.type = "mp4";
  }

  const isSupported = MediaRecorder.isTypeSupported("audio/webm");
  if (isSupported) {
    result.mimeType = "audio/webm";
    result.type = "webm";
  }

  console.error("Failed to get supported MIME type for MediaRecorder");
  return result;
}
