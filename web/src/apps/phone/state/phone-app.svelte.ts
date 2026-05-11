import { createAppRouter } from "$apps/shared/create-app-router.svelte";
import { SendEvent } from "$lib/utils/eventsHandlers";
import Contacts from "../pages/contacts/contacts.svelte";
import Keypad from "../pages/keypad/keypad.svelte";
import Recents from "../pages/recents/recents.svelte";

const SEARCH_DEBOUNCE_MS = 250;
const phoneRoutes = {
  recents: {
    label: "Recents",
    component: Recents,
  },
  contacts: {
    label: "Contacts",
    component: Contacts,
  },
  keypad: {
    label: "Keypad",
    component: Keypad,
  },
} as const;

export interface PhoneContact {
  id: number;
  name: string;
  phoneNumber: string;
  avatar: string | null;
  favorited: boolean;
}

export interface RecentCall {
  id: string;
  name: string;
  number: string;
  timestamp: string;
  direction: "incoming" | "outgoing" | "missed";
}

type FetchContactsRequest = number;

type FetchContactsResponse = PhoneContact[];

type ToggleFavoriteRequest = {
  cloudId: number;
  contactId: number;
  favorited: boolean;
};

type ToggleFavoriteResponse =
  | {
      id: number;
      favorited: boolean;
    }
  | false;

const recentCalls = [
  {
    id: "call-1",
    name: "Herman Jonsen",
    number: "+47 401 00 100",
    timestamp: "Yesterday",
    direction: "incoming",
  },
  {
    id: "call-2",
    name: "Herman Jonsen",
    number: "+47 401 00 100",
    timestamp: "Yesterday",
    direction: "missed",
  },
  {
    id: "call-3",
    name: "Mads",
    number: "+47 400 22 222",
    timestamp: "2 days ago",
    direction: "outgoing",
  },
] satisfies RecentCall[];

function isFavorite(contact: PhoneContact) {
  return contact.favorited;
}

export class PhoneAppManager {
  readonly router = createAppRouter({
    routes: phoneRoutes,
    initialRoute: "contacts",
  });
  readonly routes = this.router.routes;

  contacts = $state.raw<PhoneContact[]>([]);
  searchQuery = $state("");
  debouncedSearchQuery = $state("");
  searchTimer = $state<ReturnType<typeof setTimeout> | null>(null);

  readonly recentCalls = recentCalls;
  currentRoute = $derived(this.router.currentRoute);
  direction = $derived(this.router.direction);
  currentComponent = $derived(this.router.currentComponent);
  filteredContacts = $derived.by(() => this.getSearchResults());
  favorites = $derived(this.filteredContacts.filter(isFavorite));

  private getSearchResults(): PhoneContact[] {
    if (!this.debouncedSearchQuery) {
      return this.contacts;
    }

    const searchTerm = this.debouncedSearchQuery.trim().toLowerCase();

    return this.contacts.filter((contact) => {
      return (
        contact.name.toLowerCase().includes(searchTerm) ||
        String(contact.phoneNumber).includes(this.debouncedSearchQuery)
      );
    });
  }

  async fetchContacts(cloudId: number): Promise<PhoneContact[]> {
    if (this.contacts.length > 0) {
      return this.contacts;
    }

    const nextContacts = await SendEvent<FetchContactsResponse, FetchContactsRequest>("fetchContacts", cloudId);
    this.contacts = nextContacts || [];
    return this.contacts;
  }

  setContacts(value: PhoneContact[]): void {
    this.contacts = value;
  }

  addContact(contact: PhoneContact): void {
    this.contacts = [contact, ...this.contacts];
  }

  async toggleFavorite(cloudId: number, contactId: number): Promise<ToggleFavoriteResponse> {
    const contactToUpdate = this.contacts.find((contact) => contact.id === contactId);
    if (!contactToUpdate) {
      return false;
    }

    const result = await SendEvent<ToggleFavoriteResponse, ToggleFavoriteRequest>("toggleFavorite", {
      cloudId,
      contactId,
      favorited: !contactToUpdate.favorited,
    });

    if (!result) {
      return false;
    }

    this.contacts = this.contacts.map((contact) => {
      if (contact.id !== result.id) {
        return contact;
      }

      return {
        ...contact,
        favorited: result.favorited,
      };
    });

    return result;
  }

  navigate(routeId: keyof typeof phoneRoutes, back = false): void {
    this.router.navigate(routeId, back);
  }

  updateSearchQuery(query: string): void {
    this.searchQuery = query;

    if (this.searchTimer !== null) {
      clearTimeout(this.searchTimer);
    }

    this.searchTimer = setTimeout(() => {
      this.debouncedSearchQuery = this.searchQuery;
      this.searchTimer = null;
    }, SEARCH_DEBOUNCE_MS);
  }

  reset(): void {
    this.router.reset();

    if (this.searchTimer !== null) {
      clearTimeout(this.searchTimer);
      this.searchTimer = null;
    }

    this.contacts = [];
    this.searchQuery = "";
    this.debouncedSearchQuery = "";
  }
}

export const phoneApp = new PhoneAppManager();
