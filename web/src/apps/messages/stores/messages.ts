import { writable } from "svelte/store";

export const ACTIVE_PAGE = writable<"recent" | "conversation">("recent");
export const SELECTED_CONVERSATION_ID = writable<string | null>(null);

export function goBack() {
  ACTIVE_PAGE.set("recent");
  SELECTED_CONVERSATION_ID.set(null);
}

export function openConversation(id: string) {
  SELECTED_CONVERSATION_ID.set(id);
  ACTIVE_PAGE.set("conversation");
}
