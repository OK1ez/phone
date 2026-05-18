import { createAppRouter } from "$apps/shared/create-app-router.svelte";

import Conversation from "../pages/conversation/conversation.svelte";
import Recents from "../pages/recents/recents.svelte";

const messagesRoutes = {
  recents: {
    label: "Recents",
    component: Recents,
  },
  conversation: {
    label: "Conversation",
    component: Conversation,
  },
} as const;

export class MessagesAppManager {
  readonly router = createAppRouter({
    routes: messagesRoutes,
    initialRoute: "recents",
  });

  reset(): void {
    this.router.reset();
  }
}

export const messagesApp = new MessagesAppManager();
