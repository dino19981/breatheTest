import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { t } from "@lingui/core/macro";
import { useMemo } from "react";

interface BreathEvent {
  type: string;
  timestamp: number;
  confidence: number;
  inferenceTime: number;
  isCorrect: boolean;
  phase: string;
  predictionLabel: string;
  probabilities: number[];
  value: number;
}

interface Session {
  id: string;
  events: BreathEvent[];
}

interface SessionAnalyticsDialogProps {
  session: Session | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface BreathPattern {
  inhale: number;
  exhale: number;
  inhaleHold: number;
  exhaleHold: number;
  totalDuration: number;
}

interface BreathAnalysis {
  breathingRate: number;
  avgRatio: BreathPattern;
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
}

export function SessionAnalyticsDialog({
  session,
  open,
  onOpenChange,
}: SessionAnalyticsDialogProps) {
  const analytics = useMemo(() => {
    if (!session?.events?.length) return null;

    const events = session.events;
    const breaths = events.filter(
      (e: BreathEvent) => e.type === "prediction" && e.isCorrect,
    );

    // Calculate average confidence and inference time
    const avgConfidence =
      breaths.reduce((acc, curr) => acc + curr.confidence, 0) / breaths.length;
    const avgInferenceTime =
      breaths.reduce((acc, curr) => acc + curr.inferenceTime, 0) /
      breaths.length;

    // Safely calculate total duration
    const firstEvent = events[0];
    const lastEvent = events[events.length - 1];
    const totalDuration =
      firstEvent && lastEvent ? lastEvent.timestamp - firstEvent.timestamp : 0;

    // Calculate breathing rate (BPM)
    const breathingRate =
      totalDuration > 0
        ? Number((breaths.length / (totalDuration / 60000)).toFixed(1))
        : 0;

    // Calculate phase durations
    const phaseDurations = breaths.reduce(
      (acc, curr) => {
        const phase = curr.phase;
        if (!phase) return acc;

        if (!acc[phase]) {
          acc[phase] = {
            count: 0,
            totalDuration: 0,
            lastTimestamp: curr.timestamp,
          };
        }

        const phaseData = acc[phase];
        if (!phaseData) return acc;

        if (phaseData.lastTimestamp !== null) {
          phaseData.totalDuration += curr.timestamp - phaseData.lastTimestamp;
        }
        phaseData.count++;
        phaseData.lastTimestamp = curr.timestamp;

        return acc;
      },
      {} as Record<
        string,
        { count: number; totalDuration: number; lastTimestamp: number | null }
      >,
    );

    // Calculate average phase durations
    const avgPhaseDurations = Object.entries(phaseDurations).reduce(
      (acc, [phase, data]) => {
        if (data && data.count > 0) {
          acc[phase] = data.totalDuration / data.count;
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    // Calculate breath patterns
    const patterns = breaths.map((breath: BreathEvent) => {
      const phase = breath.phase;
      const duration = avgPhaseDurations[phase] || 0;
      return {
        inhale: phase === "inhale" ? duration : 0,
        exhale: phase === "exhale" ? duration : 0,
        inhaleHold: phase === "inhaleHold" ? duration : 0,
        exhaleHold: phase === "exhaleHold" ? duration : 0,
        totalDuration: duration,
      };
    });

    // Calculate averages
    const avgRatio = patterns.reduce(
      (acc, curr) => ({
        inhale: acc.inhale + curr.inhale,
        exhale: acc.exhale + curr.exhale,
        inhaleHold: acc.inhaleHold + curr.inhaleHold,
        exhaleHold: acc.exhaleHold + curr.exhaleHold,
        totalDuration: acc.totalDuration + curr.totalDuration,
      }),
      { inhale: 0, exhale: 0, inhaleHold: 0, exhaleHold: 0, totalDuration: 0 },
    );

    const totalBreaths = patterns.length;
    if (totalBreaths > 0) {
      avgRatio.inhale /= totalBreaths;
      avgRatio.exhale /= totalBreaths;
      avgRatio.inhaleHold /= totalBreaths;
      avgRatio.exhaleHold /= totalBreaths;
      avgRatio.totalDuration /= totalBreaths;
    }

    // Calculate breath regularity score (0-100)
    const breathDurations = patterns.map((p) => p.totalDuration);
    const avgDuration =
      breathDurations.length > 0
        ? breathDurations.reduce((a, b) => a + b, 0) / breathDurations.length
        : 0;
    const stdDev =
      avgDuration > 0
        ? Math.sqrt(
            breathDurations.reduce(
              (a, b) => a + Math.pow(b - avgDuration, 2),
              0,
            ) / breathDurations.length,
          )
        : 0;
    const regularityScore = Math.max(
      0,
      Math.min(100, 100 - (stdDev / avgDuration) * 100),
    );

    // Calculate consistency score
    const consistencyScore =
      totalBreaths > 0
        ? Math.round(
            (patterns.filter(
              (p) => p.totalDuration >= 10000 && p.totalDuration <= 14000,
            ).length /
              totalBreaths) *
              100,
          )
        : 0;

    // Ensure scores are valid numbers
    const finalRegularityScore = isNaN(regularityScore)
      ? 0
      : Math.max(0, Math.min(100, regularityScore));
    const finalConsistencyScore = isNaN(consistencyScore)
      ? 0
      : Math.max(0, Math.min(100, consistencyScore));

    // Analyze breathing pattern
    const isCoherent =
      breathingRate >= 5 &&
      breathingRate <= 6 &&
      avgRatio.inhaleHold < 1000 &&
      avgRatio.exhaleHold < 1000;
    const isBoxBreathing =
      Math.abs(avgRatio.inhale - avgRatio.exhale) < 1000 &&
      Math.abs(avgRatio.inhale - avgRatio.inhaleHold) < 1000 &&
      Math.abs(avgRatio.inhale - avgRatio.exhaleHold) < 1000;
    const is478 =
      Math.abs(avgRatio.inhale - 4000) < 1000 &&
      Math.abs(avgRatio.inhaleHold - 7000) < 1000 &&
      Math.abs(avgRatio.exhale - 8000) < 1000;

    // Calculate best minute
    const minuteBreaths = new Map<number, number>();
    breaths.forEach((breath) => {
      const minute = Math.floor(breath.timestamp / 60000);
      minuteBreaths.set(minute, (minuteBreaths.get(minute) || 0) + 1);
    });
    const bestMinute = Array.from(minuteBreaths.entries()).reduce(
      (a, b) => {
        return a[1] > b[1] ? a : b;
      },
      [0, 0],
    )[0];

    // Calculate overall breath score (0-100)
    const rateScore = Math.max(
      0,
      Math.min(100, 100 - Math.abs(breathingRate - 5.5) * 10),
    );
    const regularityScoreWeighted = Math.max(
      0,
      Math.min(100, regularityScore * 0.4),
    );
    const breathScore = Math.round(rateScore * 0.6 + regularityScoreWeighted);

    // Ensure breath score is a valid number between 0 and 100
    const finalBreathScore = isNaN(breathScore)
      ? 0
      : Math.max(0, Math.min(100, breathScore));

    // Generate feedback
    const feedback = {
      rateFeedback:
        breathingRate <= 6
          ? t`Excellent! You're in the coherent breathing zone.`
          : t`Try to slow down to 5-6 BPM for optimal results.`,
      ratioFeedback: isCoherent
        ? t`Great breathing pattern!`
        : t`Aim for equal inhale and exhale durations.`,
      consistencyFeedback:
        regularityScore >= 80
          ? t`Great consistency in your breathing pattern!`
          : t`Try to maintain a more consistent rhythm.`,
      holdFeedback:
        avgRatio.inhaleHold > 0 || avgRatio.exhaleHold > 0
          ? t`Good breath holds!`
          : t`Consider adding brief holds between breaths.`,
    };

    return {
      breathingRate,
      avgRatio: {
        inhale: avgPhaseDurations["inhale"] || 0,
        exhale: avgPhaseDurations["exhale"] || 0,
        inhaleHold: avgPhaseDurations["inhaleHold"] || 0,
        exhaleHold: avgPhaseDurations["exhaleHold"] || 0,
        totalDuration: totalDuration,
      },
      regularityScore: finalRegularityScore,
      consistencyScore: finalConsistencyScore,
      totalBreaths,
      sessionDuration: Math.round(totalDuration / 1000 / 60),
      breathScore: finalBreathScore,
      bestMinute,
      patternAnalysis: {
        isCoherent,
        isBoxBreathing,
        is478,
        suggestedPattern: isCoherent
          ? "Coherent"
          : isBoxBreathing
            ? "Box"
            : is478
              ? "4-7-8"
              : "Custom",
      },
      feedback,
      modelMetrics: {
        avgConfidence: Number(avgConfidence.toFixed(2)),
        avgInferenceTime: Number(avgInferenceTime.toFixed(2)),
        totalPredictions: events.length,
        correctPredictions: events.filter((e) => e.isCorrect).length,
      },
    };
  }, [session]);

  if (!session || !analytics) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t`Session Analytics`}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <div className="bg-card rounded-lg p-4">
              <h3 className="font-semibold mb-2">{t`Breathing Rate`}</h3>
              <p className="text-2xl font-bold">
                {analytics.breathingRate} {t`BPM`}
              </p>
              <p className="text-sm text-muted-foreground">
                {analytics.feedback.rateFeedback}
              </p>
            </div>

            <div className="bg-card rounded-lg p-4">
              <h3 className="font-semibold mb-2">{t`Breath Pattern`}</h3>
              <p className="text-lg font-medium mb-2">
                {analytics.patternAnalysis.suggestedPattern} {t`Breathing`}
              </p>
              <div className="space-y-1">
                <p className="text-sm">
                  {t`Inhale`}: {Math.round(analytics.avgRatio.inhale / 1000)}s
                </p>
                <p className="text-sm">
                  {t`Inhale Hold`}:{" "}
                  {Math.round(analytics.avgRatio.inhaleHold / 1000)}s
                </p>
                <p className="text-sm">
                  {t`Exhale`}: {Math.round(analytics.avgRatio.exhale / 1000)}s
                </p>
                <p className="text-sm">
                  {t`Exhale Hold`}:{" "}
                  {Math.round(analytics.avgRatio.exhaleHold / 1000)}s
                </p>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {analytics.feedback.ratioFeedback}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-card rounded-lg p-4">
              <h3 className="font-semibold mb-2">{t`Breath Score`}</h3>
              <p className="text-2xl font-bold">{analytics.breathScore}%</p>
              <p className="text-sm text-muted-foreground">
                {analytics.breathScore >= 80
                  ? t`Excellent session!`
                  : analytics.breathScore >= 60
                    ? t`Good session, keep practicing!`
                    : t`Keep working on your breathing technique.`}
              </p>
            </div>

            <div className="bg-card rounded-lg p-4">
              <h3 className="font-semibold mb-2">{t`Session Summary`}</h3>
              <div className="space-y-1">
                <p className="text-sm">
                  {t`Total Breaths`}: {analytics.totalBreaths}
                </p>
                <p className="text-sm">
                  {t`Session Duration`}: {analytics.sessionDuration}{" "}
                  {t`minutes`}
                </p>
                <p className="text-sm">
                  {t`Best Minute`}: {analytics.bestMinute + 1}
                </p>
                <p className="text-sm">
                  {t`Regularity Score`}: {analytics.regularityScore}%
                </p>
                <p className="text-sm">
                  {t`Consistency Score`}: {analytics.consistencyScore}%
                </p>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {analytics.feedback.consistencyFeedback}
              </p>
            </div>

            <div className="bg-card rounded-lg p-4">
              <h3 className="font-semibold mb-2">{t`Model Performance`}</h3>
              <div className="space-y-1">
                <p className="text-sm">
                  {t`Average Confidence`}:{" "}
                  {analytics.modelMetrics.avgConfidence}%
                </p>
                <p className="text-sm">
                  {t`Average Inference Time`}:{" "}
                  {analytics.modelMetrics.avgInferenceTime}ms
                </p>
                <p className="text-sm">
                  {t`Prediction Accuracy`}:{" "}
                  {Math.round(
                    (analytics.modelMetrics.correctPredictions /
                      analytics.modelMetrics.totalPredictions) *
                      100,
                  )}
                  %
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
