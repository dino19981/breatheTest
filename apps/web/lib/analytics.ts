import { Session } from "@/store/sessionsSlice";

export interface AnalyticsData {
  breathingRate: number;
  avgRatio: {
    inhale: number;
    exhale: number;
    inhaleHold: number;
    exhaleHold: number;
    totalDuration: number;
  };
  regularityScore: number;
  consistencyScore: number;
  totalBreaths: number;
  sessionDuration: number;
  breathScore: number;
  bestMinute: number;
  patternAnalysis: {
    isCoherent: boolean;
    isBoxBreathing: boolean;
    is478: boolean;
    suggestedPattern: string;
  };
  feedback: {
    rateFeedback: string;
    ratioFeedback: string;
    consistencyFeedback: string;
    holdFeedback: string;
  };
  modelMetrics: {
    avgConfidence: number;
    avgInferenceTime: number;
    totalPredictions: number;
    correctPredictions: number;
  };
}

export function buildAnalyticsFromSession(session: Session): AnalyticsData {
  const events = session.events.filter((e) => e.type === "prediction");
  if (events.length < 2) throw new Error("Not enough events for analysis");

  const start = events[0]?.timestamp ?? 0;
  const end = events[events.length - 1]?.timestamp ?? 0;
  const durationMs = end - start;

  const sessionDuration = Math.max(Math.round(durationMs / 60000), 1);

  const totalPredictions = events.length;
  const correctPredictions = events.filter((e) => e.isCorrect).length;

  const avgConfidence =
    events.reduce((sum, e) => sum + e.confidence, 0) / totalPredictions;

  const avgInferenceTime =
    events.reduce((sum, e) => sum + e.inferenceTime, 0) / totalPredictions;

  type PhaseLabel = "Inhale" | "Exhale" | "InhaleHold" | "ExhaleHold";
  const phaseDurations: Record<PhaseLabel, number> = {
    Inhale: 0,
    Exhale: 0,
    InhaleHold: 0,
    ExhaleHold: 0,
  };

  let lastRealPhase: "Inhale" | "Exhale" | null = null;

  for (let i = 1; i < events.length; i++) {
    const prev = events[i - 1];
    const curr = events[i];
    const delta = (curr?.timestamp ?? 0) - (prev?.timestamp ?? 0);

    if (delta <= 0 || delta > 30000) continue;

    const label = prev?.predictionLabel;

    if (label === "Inhale") {
      phaseDurations.Inhale += delta;
      lastRealPhase = "Inhale";
    } else if (label === "Exhale") {
      phaseDurations.Exhale += delta;
      lastRealPhase = "Exhale";
    } else if (label === "Noise") {
      if (lastRealPhase === "Inhale") {
        phaseDurations.InhaleHold += delta;
      } else if (lastRealPhase === "Exhale") {
        phaseDurations.ExhaleHold += delta;
      }
    }
  }

  const avgRatio = {
    inhale: phaseDurations.Inhale,
    exhale: phaseDurations.Exhale,
    inhaleHold: phaseDurations.InhaleHold,
    exhaleHold: phaseDurations.ExhaleHold,
    totalDuration:
      phaseDurations.Inhale +
      phaseDurations.Exhale +
      phaseDurations.InhaleHold +
      phaseDurations.ExhaleHold,
  };

  const totalBreaths = events.filter(
    (e) => e.predictionLabel === "Inhale" || e.predictionLabel === "Exhale",
  ).length;

  const breathTimestamps = events
    .filter(
      (e) => e.predictionLabel === "Inhale" || e.predictionLabel === "Exhale",
    )
    .map((e) => e.timestamp);

  const breathCountsByMinute: Record<number, number> = {};
  for (const ts of breathTimestamps) {
    const minuteIndex = Math.floor((ts - start) / 60000);
    breathCountsByMinute[minuteIndex] =
      (breathCountsByMinute[minuteIndex] || 0) + 1;
  }

  const bestMinute = Object.entries(breathCountsByMinute).reduce(
    (best, [minute, count]) =>
      count > best.count ? { minute: Number(minute), count } : best,
    { minute: 0, count: 0 },
  ).minute;

  const counts = Object.values(breathCountsByMinute);
  const avgPerMinute =
    counts.reduce((sum, c) => sum + c, 0) / (counts.length || 1);
  const stdDev =
    Math.sqrt(
      counts.reduce((sum, c) => sum + Math.pow(c - avgPerMinute, 2), 0) /
        (counts.length || 1),
    ) || 0;
  const regularityScore = Math.max(
    0,
    Math.min(100, Math.round(100 - stdDev * 10)),
  );

  const breathScore = Math.round((correctPredictions / totalPredictions) * 100);

  const feedback = {
    rateFeedback: "Looks good",
    ratioFeedback: "Pattern looks stable",
    consistencyFeedback: "Good regularity",
    holdFeedback: "Hold timing reasonable",
  };

  const patternAnalysis = {
    isCoherent: true,
    isBoxBreathing: true,
    is478: false,
    suggestedPattern: "Box",
  };

  return {
    breathingRate: Math.round(totalBreaths / sessionDuration || 0),
    avgRatio,
    regularityScore,
    consistencyScore: 90,
    totalBreaths,
    sessionDuration,
    breathScore,
    bestMinute,
    patternAnalysis,
    feedback,
    modelMetrics: {
      avgConfidence: Math.round(avgConfidence * 100),
      avgInferenceTime: Math.round(avgInferenceTime * 1000),
      totalPredictions,
      correctPredictions,
    },
  };
}
