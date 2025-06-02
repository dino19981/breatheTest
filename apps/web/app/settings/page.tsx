"use client";

import { t } from "@lingui/core/macro";
import { GeneralSettings } from "./components/GeneralSettings";
import { LanguageSettings } from "./components/LanguageSettings";
import { SoundSettings } from "./components/SoundSettings";
import { AppPreferences } from "./components/AppPreferences";
import { PrivacySettings } from "./components/PrivacySettings";

export default function SettingsPage() {
  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">{t`Settings`}</h1>
        {/* <GeneralSettings /> */}
        <LanguageSettings />
        {/* <SoundSettings /> */}
        {/* <AppPreferences /> */}
        <PrivacySettings />
      </div>
    </div>
  );
}
