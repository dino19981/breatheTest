import { t } from "@lingui/core/macro";
import { Button } from "@workspace/ui/components/button";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export function FinalCTA() {
  return (
    <div className="mt-32">
      <div className="rounded-2xl border p-12 bg-card text-center">
        <h2 className="text-4xl font-bold mb-6">{t`Ready to Transform Your Breathing?`}</h2>
        <p className="text-muted-foreground text-xl mb-8 max-w-2xl mx-auto">
          {t`Join thousands of users who have already discovered the power of proper breathing. Start your journey to better health and well-being today.`}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">
            {t`Start Now`}
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Button>
          <Button variant="outline" size="lg">
            {t`Learn More`}
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
