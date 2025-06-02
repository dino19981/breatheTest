"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { t } from "@lingui/core/macro";
import {
  Activity,
  TrendingUp,
  Target,
  BarChart2,
  Brain,
  Award,
  Timer,
  CheckCircle2,
} from "lucide-react";
import { Session } from "@/store/sessionsSlice";
import { AnalyticsData } from "@/lib/analytics";

interface SessionAnalyticsDialogProps {
  session: Session | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  analytics: AnalyticsData | null;
}

export function SessionAnalyticsDialog({
  session,
  open,
  onOpenChange,
  analytics,
}: SessionAnalyticsDialogProps) {
  if (!session || !analytics) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Activity className="w-6 h-6" />
            {t`Session Analytics`}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">{t`Breathing Rate`}</h3>
            </div>
            <p className="text-3xl font-bold mb-2">
              {analytics.breathingRate}{" "}
              <span className="text-lg text-muted-foreground">{t`BPM`}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              {analytics.feedback.rateFeedback}
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">{t`Breath Score`}</h3>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <p className="text-4xl font-bold">{analytics.breathScore}</p>
              <span className="text-lg text-muted-foreground">%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-3">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${analytics.breathScore}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {analytics.breathScore >= 80
                ? t`Excellent session!`
                : analytics.breathScore >= 60
                  ? t`Good session, keep practicing!`
                  : t`Keep working on your breathing technique.`}
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">{t`Breath Pattern`}</h3>
            </div>
            <p className="text-xl font-medium mb-4">
              {analytics.patternAnalysis.suggestedPattern} {t`Breathing`}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <PatternBox label={t`Inhale`} value={analytics.avgRatio.inhale} />
              <PatternBox
                label={t`Inhale Hold`}
                value={analytics.avgRatio.inhaleHold}
              />
              <PatternBox label={t`Exhale`} value={analytics.avgRatio.exhale} />
              <PatternBox
                label={t`Exhale Hold`}
                value={analytics.avgRatio.exhaleHold}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {analytics.feedback.ratioFeedback}
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BarChart2 className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">{t`Session Summary`}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <SummaryBox
                label={t`Total Breaths`}
                value={analytics.totalBreaths}
              />
              <SummaryBox
                label={t`Duration`}
                value={`${analytics.sessionDuration}m`}
              />
              <SummaryBox
                label={t`Best Minute`}
                value={analytics.bestMinute + 1}
              />
              <SummaryBox
                label={t`Regularity`}
                value={`${analytics.regularityScore}%`}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {analytics.feedback.consistencyFeedback}
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">{t`Model Performance`}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SummaryBox
                label={t`Confidence`}
                value={`${analytics.modelMetrics.avgConfidence}%`}
              />
              <SummaryBox
                label={t`Inference Time`}
                value={`${analytics.modelMetrics.avgInferenceTime}ms`}
              />
              <div className="bg-muted/50 rounded-lg p-3 col-span-2">
                <p className="text-sm text-muted-foreground mb-1">{t`Prediction Accuracy`}</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold">
                    {Math.round(
                      (analytics.modelMetrics.correctPredictions /
                        analytics.modelMetrics.totalPredictions) *
                        100,
                    )}
                    %
                  </p>
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Timer className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">{t`Breathing Efficiency`}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SummaryBox
                label={t`Cycle Time`}
                value={`${Math.round(analytics.avgRatio.totalDuration / 1000)}s`}
              />
              <SummaryBox
                label={t`Breaths/Min`}
                value={Math.round(
                  60 / (analytics.avgRatio.totalDuration / 1000),
                )}
              />
              <SummaryBox
                label={t`Hold Ratio`}
                value={`${Math.round(
                  ((analytics.avgRatio.inhaleHold +
                    analytics.avgRatio.exhaleHold) /
                    analytics.avgRatio.totalDuration) *
                    100,
                )}%`}
              />
              <SummaryBox
                label={t`Flow Rate`}
                value={`${Math.round(
                  ((analytics.avgRatio.inhale + analytics.avgRatio.exhale) /
                    analytics.avgRatio.totalDuration) *
                    100,
                )}%`}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              {analytics.avgRatio.totalDuration >= 10000 &&
              analytics.avgRatio.totalDuration <= 14000
                ? t`Optimal breathing cycle duration`
                : t`Consider adjusting your breathing pace`}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PatternBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-muted/50 rounded-lg p-3">
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-lg font-semibold">{Math.round(value / 1000)}s</p>
    </div>
  );
}

function SummaryBox({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-muted/50 rounded-lg p-3">
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}
