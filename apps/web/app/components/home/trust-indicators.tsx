import { t } from "@lingui/core/macro";
import {
  BeakerIcon,
  UserGroupIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

export function TrustIndicators() {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="flex flex-col items-center p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow">
        <BeakerIcon className="h-8 w-8 text-primary mb-4" />
        <h3 className="font-semibold mb-2">{t`Research-Backed`}</h3>
        <p className="text-sm text-muted-foreground text-center">
          {t`Validated by leading medical institutions and breathing experts`}
        </p>
      </div>

      <div className="flex flex-col items-center p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow">
        <UserGroupIcon className="h-8 w-8 text-primary mb-4" />
        <h3 className="font-semibold mb-2">{t`Trusted Community`}</h3>
        <p className="text-sm text-muted-foreground text-center">
          {t`Join 50,000+ users improving their well-being daily`}
        </p>
      </div>

      <div className="flex flex-col items-center p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow">
        <SparklesIcon className="h-8 w-8 text-primary mb-4" />
        <h3 className="font-semibold mb-2">{t`Smart Tools`}</h3>
        <p className="text-sm text-muted-foreground text-center">
          {t`Easy-to-follow personalized instruments with built-in guidance`}
        </p>
      </div>
    </div>
  );
}
