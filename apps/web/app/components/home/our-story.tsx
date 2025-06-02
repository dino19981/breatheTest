import { t } from "@lingui/core/macro";
import { Button } from "@workspace/ui/components/button";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export function OurStory() {
  return (
    <div className="mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6">{t`Our Story`}</h2>
          <p className="text-muted-foreground mb-6">
            {t`Breathtake was born from a simple observation: while breathing is fundamental to life, most of us don't breathe optimally. Our journey began when our founder, a former professional athlete, discovered the transformative power of proper breathing techniques during recovery from a career-ending injury.`}
          </p>
          <p className="text-muted-foreground mb-6">
            {t`What started as a personal quest for better breathing evolved into a mission to make these powerful techniques accessible to everyone. We combined ancient wisdom with modern technology, creating a platform that makes breathing exercises not just effective, but engaging and personalized.`}
          </p>
          <p className="text-muted-foreground mb-8">
            {t`Today, Breathtake stands at the intersection of science and wellness, backed by medical research and trusted by professionals across various fields. Our commitment to innovation and user experience continues to drive us forward as we help people worldwide breathe better, live better.`}
          </p>
          <Button>
            {t`Learn More About Us`}
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Button>
        </div>
        <div className="rounded-xl border overflow-hidden bg-muted aspect-square">
          {/* Placeholder for company image/video */}
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-muted-foreground">{t`Our Story`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
