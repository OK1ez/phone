export type LocaleKey = string;
export type LocaleValue = string;

export interface LocaleState {
  translations: Record<LocaleKey, LocaleValue>;
}
