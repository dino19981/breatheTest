import { t } from "@lingui/core/macro";
import { Button } from "@workspace/ui/components/button";
import { PlayIcon } from "@heroicons/react/24/solid";

export function HowItWorks() {
  return (
    <div className="mt-32">
      <h2 className="text-4xl font-bold text-center mb-16">{t`How it Works`}</h2>

      {/* Smart Tools Approach */}
      <div className="mb-24">
        <h3 className="text-2xl font-semibold mb-8 text-center">{t`Smart Tools Approach`}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="rounded-xl border p-6 bg-card">
            <div className="text-xl font-semibold mb-2">
              1. {t`Smart Analysis`}
            </div>
            <p className="text-muted-foreground">
              {t`Our AI analyzes your breathing patterns and stress levels in real-time using advanced biometric tracking.`}
            </p>
          </div>

          <div className="rounded-xl border p-6 bg-card">
            <div className="text-xl font-semibold mb-2">
              2. {t`Personalized Sessions`}
            </div>
            <p className="text-muted-foreground">
              {t`AI automatically generates custom breathing exercises tailored to your current state and goals.`}
            </p>
          </div>

          <div className="rounded-xl border p-6 bg-card">
            <div className="text-xl font-semibold mb-2">
              3. {t`Real-time Guidance`}
            </div>
            <p className="text-muted-foreground">
              {t`Get instant feedback and adjustments during your session for optimal results.`}
            </p>
          </div>

          <div className="rounded-xl border p-6 bg-card">
            <div className="text-xl font-semibold mb-2">
              4. {t`Progress Tracking`}
            </div>
            <p className="text-muted-foreground">
              {t`AI monitors your improvement and automatically adjusts future sessions for better outcomes.`}
            </p>
          </div>
        </div>
      </div>

      {/* Self-Paced Approach */}
      <div className="mb-24">
        <h3 className="text-2xl font-semibold mb-8 text-center">{t`Self-Paced Approach`}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="rounded-xl border p-6 bg-card">
            <div className="text-xl font-semibold mb-2">
              1. {t`Choose Your Practice`}
            </div>
            <p className="text-muted-foreground">
              {t`Select from our library of traditional breathing techniques and meditation practices.`}
            </p>
          </div>

          <div className="rounded-xl border p-6 bg-card">
            <div className="text-xl font-semibold mb-2">
              2. {t`Set Your Parameters`}
            </div>
            <p className="text-muted-foreground">
              {t`Customize session duration, breathing rhythm, and guidance level to match your preferences.`}
            </p>
          </div>

          <div className="rounded-xl border p-6 bg-card">
            <div className="text-xl font-semibold mb-2">
              3. {t`Follow Along`}
            </div>
            <p className="text-muted-foreground">
              {t`Use our intuitive visual and audio cues to maintain your chosen breathing pattern.`}
            </p>
          </div>

          <div className="rounded-xl border p-6 bg-card">
            <div className="text-xl font-semibold mb-2">
              4. {t`Track Manually`}
            </div>
            <p className="text-muted-foreground">
              {t`Keep a personal log of your sessions and note your mental and physical improvements.`}
            </p>
          </div>
        </div>
      </div>

      {/* Video Demo Section */}
      <div className="mt-16 text-center">
        <div className="aspect-video max-w-4xl mx-auto rounded-xl border overflow-hidden bg-muted">
          {/* Placeholder for video - replace with actual video component */}
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-muted-foreground">{t`Watch How Breathtake Works`}</p>
          </div>
        </div>
        <Button variant="outline" size="lg" className="mt-8">
          <PlayIcon className="h-5 w-5 mr-2" />
          {t`Watch Demo Video`}
        </Button>
      </div>
    </div>
  );
}
