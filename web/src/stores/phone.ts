import { writable } from "svelte/store";

export const IS_LOCKED = writable<boolean>(true);

export const APPS = writable({
  settings: { name: "Settings" },
  bleeter: { name: "Bleeter" },
  phone: { name: "Phone" },
  messages: { name: "Messages" },
  mail: { name: "Mail" },
});

export const SELECTED_APP = writable<string | null>(null);
