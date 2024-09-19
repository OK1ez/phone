import { writable } from "svelte/store";

export const ACTIVE_PAGE = writable<string>('home')

export function setActivePage(page: string) {
  ACTIVE_PAGE.set(page)
}