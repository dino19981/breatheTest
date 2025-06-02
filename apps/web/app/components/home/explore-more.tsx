import { t } from "@lingui/core/macro";
import { Button } from "@workspace/ui/components/button";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export function ExploreMore() {
  return (
    <div className="mt-32">
      <h2 className="text-4xl font-bold text-center mb-16">{t`Explore More`}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Blog */}
        <div className="rounded-xl border p-6 bg-card">
          <h3 className="text-2xl font-semibold mb-4">{t`Blog`}</h3>
          <p className="text-muted-foreground mb-6">
            {t`Discover articles about breathing techniques, wellness tips, and the latest research in respiratory health.`}
          </p>
          <Button variant="outline" className="w-full">
            {t`Read Articles`}
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Button>
        </div>

        {/* Research */}
        <div className="rounded-xl border p-6 bg-card">
          <h3 className="text-2xl font-semibold mb-4">{t`Research`}</h3>
          <p className="text-muted-foreground mb-6">
            {t`Explore scientific studies and clinical trials that validate the effectiveness of breathing exercises.`}
          </p>
          <Button variant="outline" className="w-full">
            {t`View Studies`}
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Button>
        </div>

        {/* Community */}
        <div className="rounded-xl border p-6 bg-card">
          <h3 className="text-2xl font-semibold mb-4">{t`Community`}</h3>
          <p className="text-muted-foreground mb-6">
            {t`Join our growing community of breathing enthusiasts, share experiences, and learn from others.`}
          </p>
          <Button variant="outline" className="w-full">
            {t`Join Community`}
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Button>
        </div>

        {/* Resources */}
        <div className="rounded-xl border p-6 bg-card">
          <h3 className="text-2xl font-semibold mb-4">{t`Resources`}</h3>
          <p className="text-muted-foreground mb-6">
            {t`Access free guides, worksheets, and tools to enhance your breathing practice.`}
          </p>
          <Button variant="outline" className="w-full">
            {t`Download Resources`}
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Button>
        </div>

        {/* Events */}
        <div className="rounded-xl border p-6 bg-card">
          <h3 className="text-2xl font-semibold mb-4">{t`Events`}</h3>
          <p className="text-muted-foreground mb-6">
            {t`Join our webinars, workshops, and live sessions with breathing experts.`}
          </p>
          <Button variant="outline" className="w-full">
            {t`View Events`}
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Button>
        </div>

        {/* Support */}
        <div className="rounded-xl border p-6 bg-card">
          <h3 className="text-2xl font-semibold mb-4">{t`Support`}</h3>
          <p className="text-muted-foreground mb-6">
            {t`Get help with your breathing practice, technical support, or general inquiries.`}
          </p>
          <Button variant="outline" className="w-full">
            {t`Get Support`}
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
