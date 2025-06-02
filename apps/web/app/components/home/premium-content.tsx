import { t } from "@lingui/core/macro";
import {
  UserGroupIcon,
  BeakerIcon,
  PlayIcon,
  BookOpenIcon,
  UsersIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";

export function PremiumContent() {
  return (
    <div className="mt-24 rounded-2xl border bg-card overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6">{t`Premium Content Library`}</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <UserGroupIcon className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">{t`Medical Expert Insights`}</h3>
                <p className="text-sm text-muted-foreground">
                  {t`Exclusive articles and video sessions from leading pulmonologists, cardiologists, and respiratory therapists`}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <BeakerIcon className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">{t`Scientific Research`}</h3>
                <p className="text-sm text-muted-foreground">
                  {t`Access to peer-reviewed studies, clinical trials, and breakthrough research on breathing techniques`}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <PlayIcon className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">{t`Ambassador Stories`}</h3>
                <p className="text-sm text-muted-foreground">
                  {t`Video diaries and testimonials from our medical ambassadors and wellness experts`}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <BookOpenIcon className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">{t`Clinical Protocols`}</h3>
                <p className="text-sm text-muted-foreground">
                  {t`Step-by-step breathing protocols developed by medical professionals for specific conditions`}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <UsersIcon className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">{t`Success Stories`}</h3>
                <p className="text-sm text-muted-foreground">
                  {t`Real case studies and testimonials from users who improved their health through breathing`}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <ArrowDownTrayIcon className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">{t`Medical Resources`}</h3>
                <p className="text-sm text-muted-foreground">
                  {t`Downloadable medical guides, breathing assessment tools, and progress tracking templates`}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-muted aspect-square md:aspect-auto flex items-center justify-center">
          {/* Placeholder for content preview */}
          <div className="text-muted-foreground">{t`Content Preview`}</div>
        </div>
      </div>
    </div>
  );
}
