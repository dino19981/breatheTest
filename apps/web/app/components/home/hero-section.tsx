import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import { t } from "@lingui/core/macro";

export function HeroSection() {
  return (
    <div className="text-center space-y-6">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="h-28 w-64 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="flex flex-col items-center">
            <span className="font-extrabold text-3xl tracking-tight text-white">
              Breathtake
            </span>
            <span className="text-white/80 text-sm mt-1">
              Breathe. Focus. Thrive.
            </span>
          </div>
        </div>
      </div>

      <div className="inline-block bg-green-100 text-green-800 rounded-full px-4 py-1 mb-4">
        🎉 {t`Upgrade your self-care with a free premium on us`}
      </div>

      <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
        {t`Your personal breathing assistant`}
      </h1>

      <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto">
        {t`Your body is your main device — your breath is your dashboard. Take control of your well-being with personalized breathing analytics and real-time guidance.`}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Link href="/session">
          <Button size="lg" className="w-full sm:w-auto text-lg px-8">
            {t`Start your journey`}
          </Button>
        </Link>
        <Link href="/pricing">
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto text-lg px-8"
          >
            {t`See how it works`}
          </Button>
        </Link>
      </div>
    </div>
  );
}
