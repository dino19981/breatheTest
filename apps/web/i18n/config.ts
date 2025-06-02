export const locales = {
  en: "English",
  ru: "Русский",
};

export type Locale = keyof typeof locales;
export const defaultLocale: Locale = "en";
