import { writable } from "svelte/store";

export const ACTIVE_PAGE = writable<string>("home");
export const LOGGED_IN_AS = writable<string>("okiez");
export const SELECTED_USER = writable<string | null>(null);
export const SELECTED_BLEET = writable<string | null>(null);
