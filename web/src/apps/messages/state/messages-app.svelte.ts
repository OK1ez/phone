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
  readonly routes = this.router.routes;

  currentRoute = $derived(this.router.currentRoute);
  direction = $derived(this.router.direction);
  currentComponent = $derived(this.router.currentComponent);

  navigate(routeId: keyof typeof messagesRoutes, back = false): void {
    this.router.navigate(routeId, back);
  }

  reset(): void {
    this.router.reset();
  }
}

export const messagesApp = new MessagesAppManager();
