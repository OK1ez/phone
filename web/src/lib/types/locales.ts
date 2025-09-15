import locales from "~/locales/en.json";

export type LocaleKey = keyof typeof locales;
export type LocaleValue = string;
