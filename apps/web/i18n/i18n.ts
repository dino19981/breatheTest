import { i18n } from "@lingui/core";
import { en, ru } from "make-plural/plurals";
import { messages as enMessages } from "../locales/en.mjs";
import { messages as ruMessages } from "../locales/ru.mjs";

i18n.loadLocaleData({
  en: { plurals: en },
  ru: { plurals: ru },
});

i18n.load({
  en: enMessages,
  ru: ruMessages,
});

i18n.activate("en");

export { i18n };
