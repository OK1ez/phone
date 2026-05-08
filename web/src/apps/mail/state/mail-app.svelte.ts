import { createAppRouter } from "$apps/shared/create-app-router.svelte";

import Inbox from "../pages/inbox/inbox.svelte";
import View from "../pages/view/view.svelte";

export interface MailMessage {
  id: string;
  subject: string;
  preview: string;
  timestamp: string;
  content: string;
}

const messages = [
  {
    id: "message-1",
    subject: "Important Meeting",
    preview: "We need to discuss the upcoming project. Please prepare a brief summary.",
    timestamp: "Yesterday",
    content: "We need to discuss the upcoming project. Please prepare a brief summary.",
  },
] satisfies MailMessage[];

const router = createAppRouter({
  routes: {
    inbox: {
      label: "Inbox",
      component: Inbox,
    },
    view: {
      label: "View",
      component: View,
    },
  },
  initialRoute: "inbox",
});

let selectedMessage = $state<MailMessage | null>(messages[0] ?? null);

export const mailApp = {
  messages,
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
  get selectedMessage() {
    return selectedMessage;
  },
  navigate(routeId: keyof typeof router.routes, back = false) {
    router.navigate(routeId, back);
  },
  reset() {
    router.reset();
    selectedMessage = messages[0] ?? null;
  },
  openMessage(message: MailMessage) {
    selectedMessage = message;
    router.navigate("view");
  },
};
