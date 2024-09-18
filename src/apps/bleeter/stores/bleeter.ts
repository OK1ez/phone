import { writable } from "svelte/store";

export const ACTIVE_PAGE = writable<string>('home')