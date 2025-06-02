import { t } from "@lingui/core/macro";
import Link from "next/link";

export function GallerySection() {
  return (
    <div className="mt-24">
      <h2 className="text-4xl font-bold mb-12 text-center">{t`BreathTAKING Gallery`}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/gallery/stress" className="group">
          <div className="aspect-square rounded-xl border bg-card p-6 hover:shadow-lg transition-shadow relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-300" />
            <div className="relative z-10">
              <h3 className="font-semibold mb-2">{t`Stress Relief`}</h3>
              <p className="text-sm text-muted-foreground">{t`Calm your mind`}</p>
            </div>
          </div>
        </Link>
        <Link href="/gallery/sports" className="group">
          <div className="aspect-square rounded-xl border bg-card p-6 hover:shadow-lg transition-shadow relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-yellow-500/20 group-hover:scale-110 transition-transform duration-300" />
            <div className="relative z-10">
              <h3 className="font-semibold mb-2">{t`Sports Performance`}</h3>
              <p className="text-sm text-muted-foreground">{t`Optimize your training`}</p>
            </div>
          </div>
        </Link>
        <Link href="/gallery/focus" className="group">
          <div className="aspect-square rounded-xl border bg-card p-6 hover:shadow-lg transition-shadow relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 group-hover:scale-110 transition-transform duration-300" />
            <div className="relative z-10">
              <h3 className="font-semibold mb-2">{t`Focus & Productivity`}</h3>
              <p className="text-sm text-muted-foreground">{t`Enhance concentration`}</p>
            </div>
          </div>
        </Link>
        <Link href="/gallery/sleep" className="group">
          <div className="aspect-square rounded-xl border bg-card p-6 hover:shadow-lg transition-shadow relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 group-hover:scale-110 transition-transform duration-300" />
            <div className="relative z-10">
              <h3 className="font-semibold mb-2">{t`Better Sleep`}</h3>
              <p className="text-sm text-muted-foreground">{t`Rest and recover`}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
