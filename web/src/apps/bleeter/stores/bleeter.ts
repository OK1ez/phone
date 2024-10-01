import { writable } from "svelte/store";

export const ACTIVE_PAGE = writable<string>("home");
export const LOGGED_IN_AS = writable<string>("okiez");
