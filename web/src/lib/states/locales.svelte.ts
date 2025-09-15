import locales from "~/locales/en.json";

export const locale = (key: keyof typeof locales): string => {
  return locales[key] ?? key;
};
