import { BreathPhase } from "../hooks/useBreathTimer";

export const mapPrediction = (v: number | null): BreathPhase | null => {
  if (v === 1) return "inhale";
  if (v === 2) return "exhale";
  return v !== null ? "hold" : null;
};
