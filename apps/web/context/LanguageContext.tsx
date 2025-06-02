"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { i18n } from "@/i18n/i18n";
import { I18nProvider } from "@lingui/react";

type LanguageContextType = {
  language: string;
  changeLanguage: (lang: string) => Promise<void>;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  changeLanguage: async () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string>("en");
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      const saved = localStorage.getItem("appLanguage");
      const lang = saved || "en";

      if (lang !== i18n.locale) {
        i18n.activate(lang);
      }

      setLanguage(lang);
      setReady(true);
    };

    load();
  }, []);

  const changeLanguage = async (lang: string) => {
    localStorage.setItem("appLanguage", lang);

    if (lang !== i18n.locale) {
      i18n.activate(lang);
    }

    setLanguage(lang);
  };

  if (!ready) return null;

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      <I18nProvider i18n={i18n}>{children}</I18nProvider>
    </LanguageContext.Provider>
  );
};
