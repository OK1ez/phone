import Home from "./pages/home/home.svelte";

class BleeterApp {
  routes = {
    home: {
      label: "Home",
      route: Home,
    },
  };

  currentRoute: keyof typeof this.routes = $state("home");
  direction: "forward" | "back" = $state("forward");

  navigate(id: keyof typeof this.routes, back?: boolean) {
    this.direction = back ? "back" : "forward";
    this.currentRoute = id;
  }
}

export const bleeterApp = new BleeterApp();
