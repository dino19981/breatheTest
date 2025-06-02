import { useEffect, useState } from "react";
import { mapPrediction } from "@/lib/session/utils/mapPrediction";
import { BreathPhase } from "./useBreathTimer";

export const useLiveCorrect = (
  active: boolean,
  socketEnabled: boolean,
  phase: BreathPhase,
  prediction: number | null,
) => {
  const [isLiveCorrect, setIsLiveCorrect] = useState(true);

  useEffect(() => {
    if (!active || prediction === null || !socketEnabled) return;

    const expected = phase === "holdWithout" ? "hold" : phase;
    const predicted = mapPrediction(prediction);

    setIsLiveCorrect(predicted === expected);
  }, [active, socketEnabled, phase, prediction]);

  return isLiveCorrect;
};
