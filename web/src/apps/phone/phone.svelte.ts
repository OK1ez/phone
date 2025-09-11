import Recents from "./pages/recents/recents.svelte";

export class PhoneApp {
  routes = {
    recents: {
      label: "Recents",
      route: Recents,
    },
  };

  currentRoute: keyof typeof this.routes = $state("recents");
  direction: "forward" | "back" = $state("forward");

  navigate(id: keyof typeof this.routes, back?: boolean) {
    this.direction = back ? "back" : "forward";
    this.currentRoute = id;
  }
}

export const phoneApp = new PhoneApp();
