import Recents from "./pages/recents/recents.svelte";
import Favorites from "./pages/favorites/favorites.svelte";
import Contacts from "./pages/contacts/contacts.svelte";
import Keypad from "./pages/keypad/keypad.svelte";

class PhoneApp {
  routes = {
    favorites: {
      label: "Favorites",
      route: Favorites,
    },
    recents: {
      label: "Recents",
      route: Recents,
    },
    contacts: {
      label: "Contacts",
      route: Contacts,
    },
    keypad: {
      label: "Keypad",
      route: Keypad,
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
