import Inbox from "./pages/inbox/inbox.svelte";
import View from "./pages/view/view.svelte";

class MailApp {
  routes = {
    inbox: {
      label: "Inbox",
      route: Inbox,
    },
    view: {
      label: "View",
      route: View,
    },
  };

  currentRoute: keyof typeof this.routes = $state("inbox");
  direction: "forward" | "back" = $state("forward");

  navigate(id: keyof typeof this.routes, back?: boolean) {
    this.direction = back ? "back" : "forward";
    this.currentRoute = id;
  }
}

export const mailApp = new MailApp();
