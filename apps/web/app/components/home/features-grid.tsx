import { t } from "@lingui/core/macro";
import { SparklesIcon, HeartIcon, StarIcon } from "@heroicons/react/24/solid";

export function FeaturesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
      <div className="rounded-xl border p-8 bg-card hover:shadow-lg transition-shadow">
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
          <SparklesIcon className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-3">{t`Easy-to-Follow Sessions`}</h2>
        <p className="text-muted-foreground">
          {t`Personalized breathing exercises tailored to your needs. Our built-in assistant makes it simple to start and maintain your practice.`}
        </p>
      </div>

      <div className="rounded-xl border p-8 bg-card hover:shadow-lg transition-shadow">
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
          <HeartIcon className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-3">{t`Personal Growth Insights`}</h2>
        <p className="text-muted-foreground">
          {t`Track your progress and receive meaningful feedback that helps you build better habits and improve your daily well-being.`}
        </p>
      </div>

      <div className="rounded-xl border p-8 bg-card hover:shadow-lg transition-shadow">
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
          <StarIcon className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-3">{t`Premium Content`}</h2>
        <p className="text-muted-foreground">
          {t`Access a growing library of guided meditations, breathing techniques, and mindfulness exercises.`}
        </p>
      </div>
    </div>
  );
}
