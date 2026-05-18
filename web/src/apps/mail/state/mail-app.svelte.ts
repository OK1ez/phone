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

const mailRoutes = {
  inbox: {
    label: "Inbox",
    component: Inbox,
  },
  view: {
    label: "View",
    component: View,
  },
} as const;

export class MailAppManager {
  readonly router = createAppRouter({
    routes: mailRoutes,
    initialRoute: "inbox",
  });
  readonly routes = this.router.routes;
  readonly messages = messages;

  selectedMessage = $state<MailMessage | null>(messages[0] ?? null);

  currentRoute = $derived(this.router.currentRoute);
  direction = $derived(this.router.direction);
  currentComponent = $derived(this.router.currentComponent);

  navigate(routeId: keyof typeof mailRoutes, back = false): void {
    this.router.navigate(routeId, back);
  }

  reset(): void {
    this.router.reset();
    this.selectedMessage = this.messages[0] ?? null;
  }

  openMessage(message: MailMessage): void {
    this.selectedMessage = message;
    this.router.navigate("view");
  }
}

export const mailApp = new MailAppManager();
