import type { LocaleKey, LocaleValue } from "@/lib/types/locales";

export class LocaleManager {
  translations = $state<Record<LocaleKey, LocaleValue>>({});

  getTranslation(key: LocaleKey): LocaleValue {
    return this.translations[key] ?? key;
  }

  setTranslations(newLocales: Record<LocaleKey, LocaleValue>) {
    this.translations = newLocales;
  }
}

export const localeManager = new LocaleManager();

// Helper function
export const locale = (key: LocaleKey): LocaleValue =>
  localeManager.getTranslation(key);
