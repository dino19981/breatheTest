"use client";

import { HeroSection } from "./components/home/hero-section";
import { TrustIndicators } from "./components/home/trust-indicators";
import { DashboardInterface } from "./components/home/dashboard-interface";
import { GallerySection } from "./components/home/gallery-section";
import { PremiumContent } from "./components/home/premium-content";
import { FeaturesGrid } from "./components/home/features-grid";
import { TrustedBy } from "./components/home/trusted-by";
import { HowItWorks } from "./components/home/how-it-works";
import { Testimonials } from "./components/home/testimonials";
import { OurStory } from "./components/home/our-story";
import { ExploreMore } from "./components/home/explore-more";
import { FinalCTA } from "./components/home/final-cta";
import { Footer } from "./components/home/footer";
import { useEffect } from "react";
import OneSignal from "react-onesignal";

declare global {
  interface Window {
    __oneSignalInitialized?: boolean;
  }
}

export default function HomePage() {
  const pushKey = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!;
  useEffect(() => {
    if (typeof window !== "undefined" && window.__oneSignalInitialized) {
      return;
    }

    if (typeof window !== "undefined") {
      window.__oneSignalInitialized = true;
    }

    OneSignal.init({
      appId: pushKey,
      allowLocalhostAsSecureOrigin: true,
    })
      .then(() => {
        OneSignal.Debug.setLogLevel("warn");
        OneSignal.Notifications.requestPermission();
        console.log("Push support:", OneSignal.Notifications.isPushSupported());
      })
      .catch((err) => console.error("OneSignal init error:", err));
  }, [pushKey]);

  return (
    <div className="flex flex-col items-center min-h-svh">
      <div className="w-full max-w-6xl px-4 py-12 space-y-8">
        <HeroSection />
        <TrustIndicators />
        <DashboardInterface />
        <GallerySection />
        <PremiumContent />
        <FeaturesGrid />
        <TrustedBy />
        <HowItWorks />
        <Testimonials />
        <OurStory />
        <ExploreMore />
        <FinalCTA />
      </div>
      <Footer />
    </div>
  );
}
