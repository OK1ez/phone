import { writable } from "svelte/store";

export const IS_LOCKED = writable<boolean>(true);

export const APPS = writable({
  settings: { name: "Settings" },
  bleeter: { name: "Bleeter" },
  phone: { name: "Phone" },
  messages: { name: "Messages" },
  mail: { name: "Mail" },
  // notes: { name: "Notes" },
  // groups: { name: "Groups" },
  // banking: { name: "Bank" }, // inspo: https://dribbble.com/shots/24646331-Digital-Banking-Mobile-Application
  // gallery: { name: "Gallery" },
  // camera: { name: "Camera" },
  // market: { name: "Market" },
});

export const SELECTED_APP = writable<string | null>(null);
