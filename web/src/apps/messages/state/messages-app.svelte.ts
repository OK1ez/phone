import { createAppRouter } from "$apps/shared/create-app-router.svelte";

import Conversation from "../pages/conversation/conversation.svelte";
import Recents from "../pages/recents/recents.svelte";

const router = createAppRouter({
  routes: {
    recents: {
      label: "Recents",
      component: Recents,
    },
    conversation: {
      label: "Conversation",
      component: Conversation,
    },
  },
  initialRoute: "recents",
});

export const messagesApp = {
  get routes() {
    return router.routes;
  },
  get currentRoute() {
    return router.currentRoute;
  },
  get direction() {
    return router.direction;
  },
  get currentComponent() {
    return router.currentComponent;
  },
  navigate(routeId: keyof typeof router.routes, back = false) {
    router.navigate(routeId, back);
  },
  reset() {
    router.reset();
  },
};
