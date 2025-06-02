import { t } from "@lingui/core/macro";
import { useEffect, useState } from "react";

export const mapPhaseToPrediction: Record<string, number> = {
  inhale: 1,
  exhale: 2,
  hold: 0,
  holdWithout: 0,
};

export type Phase = "inhale" | "exhale" | "hold" | "holdWithout";

export const useNormalizedPrediction = (
  phase: Phase | null,
  prediction: number | null,
  predictionIdx: number | null,
) => {
  const [predictionsBuffer, setPredictionsBuffer] = useState<number[]>([]);
  const [normalizedPrediction, setNormalizedPrediction] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (prediction === null || predictionIdx === null) {
      return;
    }

    setPredictionsBuffer([...predictionsBuffer, prediction].slice(-10));
  }, [prediction, predictionIdx]);

  useEffect(() => {
    if (phase === null) {
      return;
    }

    if (predictionsBuffer.length === 0) {
      return;
    }

    const phaseNumber = mapPhaseToPrediction[phase] as number;
    const latestPrediction = predictionsBuffer[predictionsBuffer.length - 1];

    if (phaseNumber === latestPrediction) {
      setNormalizedPrediction(latestPrediction);

      return;
    }

    if (predictionsBuffer.length < 3) {
      return;
    }

    const lastThreePredictions = predictionsBuffer.slice(-3);
    const allSame = lastThreePredictions.every(
      (pred) => pred === lastThreePredictions[0],
    );

    if (allSame) {
      setNormalizedPrediction(lastThreePredictions[0]!);
    }
  }, [predictionsBuffer, phase]);

  return normalizedPrediction;
};

export const phaseLabel = (phase: Phase): string => {
  switch (phase) {
    case "inhale":
      return t`Inhale`;
    case "exhale":
      return t`Exhale`;
    case "hold":
    case "holdWithout":
      return t`Hold`;
    default:
      return t`Start`;
  }
};

export const getLabel = (prediction: number) => {
  switch (prediction) {
    case 1:
      return t`Inhale`;
    case 2:
      return t`Exhale`;
    case 0:
      return t`Hold`;
    default:
      throw new Error(`Unknown prediction: ${prediction}`);
  }
};

export const outerCircleSizeDesktop = 366;
export const outerCircleSizeMobile = 300;

export const baseInnerSize = 180;
