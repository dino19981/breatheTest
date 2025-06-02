import { t } from "@lingui/core/macro";
import { HeartIcon, SparklesIcon, StarIcon } from "@heroicons/react/24/solid";

export function DashboardInterface() {
  return (
    <div className="mt-24 rounded-2xl border bg-card p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-6">
            {t`Your Personal Breathing Dashboard`}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t`Take control of your physical and mental state with real-time breathing analytics. Monitor patterns, track progress, and optimize your well-being.`}
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <HeartIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{t`Heart Rate Variability`}</h3>
                <p className="text-sm text-muted-foreground">{t`Track your stress levels`}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <SparklesIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{t`Breathing Patterns`}</h3>
                <p className="text-sm text-muted-foreground">{t`Analyze your breathing rhythm`}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <StarIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{t`Progress Tracking`}</h3>
                <p className="text-sm text-muted-foreground">{t`See your improvement over time`}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="aspect-square rounded-xl bg-muted flex items-center justify-center">
          {/* Placeholder for dashboard visualization */}
          <div className="text-muted-foreground">{t`Interactive Dashboard Demo`}</div>
        </div>
      </div>
    </div>
  );
}
