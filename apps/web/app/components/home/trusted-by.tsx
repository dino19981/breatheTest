import { t } from "@lingui/core/macro";
import {
  UserGroupIcon,
  BeakerIcon,
  TrophyIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/solid";
import { TwitterIcon, LinkedinIcon, InstagramIcon } from "lucide-react";
import Link from "next/link";

export function TrustedBy() {
  return (
    <div className="mt-20 text-center">
      <h2 className="text-3xl font-bold mb-12">{t`Trusted by professionals and creators`}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow">
          <BeakerIcon className="h-8 w-8 text-primary mb-4 mx-auto" />
          <h3 className="font-semibold mb-2">{t`Medical`}</h3>
          <p className="text-sm text-muted-foreground mb-4">{t`Doctors and healthcare providers`}</p>
          <div className="flex flex-col items-center space-y-2">
            <div className="text-xs text-muted-foreground">
              {t`Dr. Sarah Chen, Pulmonologist`}
            </div>
            <div className="flex space-x-2">
              <Link
                href="https://twitter.com/drsarahchen"
                target="_blank"
                className="text-muted-foreground hover:text-primary"
              >
                <TwitterIcon className="h-4 w-4" />
              </Link>
              <Link
                href="https://linkedin.com/in/drsarahchen"
                target="_blank"
                className="text-muted-foreground hover:text-primary"
              >
                <LinkedinIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow">
          <TrophyIcon className="h-8 w-8 text-primary mb-4 mx-auto" />
          <h3 className="font-semibold mb-2">{t`Sports`}</h3>
          <p className="text-sm text-muted-foreground mb-4">{t`Athletes and coaches`}</p>
          <div className="flex flex-col items-center space-y-2">
            <div className="text-xs text-muted-foreground">
              {t`Michael Rodriguez, Olympic Coach`}
            </div>
            <div className="flex space-x-2">
              <Link
                href="https://twitter.com/michaelrodriguez"
                target="_blank"
                className="text-muted-foreground hover:text-primary"
              >
                <TwitterIcon className="h-4 w-4" />
              </Link>
              <Link
                href="https://instagram.com/michaelrodriguez"
                target="_blank"
                className="text-muted-foreground hover:text-primary"
              >
                <InstagramIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow">
          <UserGroupIcon className="h-8 w-8 text-primary mb-4 mx-auto" />
          <h3 className="font-semibold mb-2">{t`Stress Management`}</h3>
          <p className="text-sm text-muted-foreground mb-4">{t`Therapists and wellness experts`}</p>
          <div className="flex flex-col items-center space-y-2">
            <div className="text-xs text-muted-foreground">
              {t`Emma Thompson, Mindfulness Coach`}
            </div>
            <div className="flex space-x-2">
              <Link
                href="https://twitter.com/emmathompson"
                target="_blank"
                className="text-muted-foreground hover:text-primary"
              >
                <TwitterIcon className="h-4 w-4" />
              </Link>
              <Link
                href="https://linkedin.com/in/emmathompson"
                target="_blank"
                className="text-muted-foreground hover:text-primary"
              >
                <LinkedinIcon className="h-4 w-4" />
              </Link>
              <Link
                href="https://instagram.com/emmathompson"
                target="_blank"
                className="text-muted-foreground hover:text-primary"
              >
                <InstagramIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow">
          <BriefcaseIcon className="h-8 w-8 text-primary mb-4 mx-auto" />
          <h3 className="font-semibold mb-2">{t`Business`}</h3>
          <p className="text-sm text-muted-foreground mb-4">{t`Executives and teams`}</p>
          <div className="flex flex-col items-center space-y-2">
            <div className="text-xs text-muted-foreground">
              {t`David Kim, Tech CEO`}
            </div>
            <div className="flex space-x-2">
              <Link
                href="https://twitter.com/davidkim"
                target="_blank"
                className="text-muted-foreground hover:text-primary"
              >
                <TwitterIcon className="h-4 w-4" />
              </Link>
              <Link
                href="https://linkedin.com/in/davidkim"
                target="_blank"
                className="text-muted-foreground hover:text-primary"
              >
                <LinkedinIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
