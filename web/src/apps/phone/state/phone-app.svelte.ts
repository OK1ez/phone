import { createAppRouter } from "$apps/shared/create-app-router.svelte";
import { SendEvent } from "$lib/utils/eventsHandlers";
import Contacts from "../pages/contacts/contacts.svelte";
import Keypad from "../pages/keypad/keypad.svelte";
import Recents from "../pages/recents/recents.svelte";

const SEARCH_DEBOUNCE_MS = 250;

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

const router = createAppRouter({
  routes: {
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
  },
  initialRoute: "contacts",
});

let contacts = $state.raw<PhoneContact[]>([]);
let loadedCloudId = $state<number | null>(null);
let searchQuery = $state("");
let debouncedSearchQuery = $state("");
let searchIndex = $state<Record<string, { name: string; phoneNumber: string }>>({});
let searchTimer: number | null = $state(null);

function normalizeSearchTerm(value: string) {
  return value.trim().toLowerCase();
}

function normalizePhoneNumber(value: string | number) {
  return String(value).replace(/\s+/g, "");
}

function sortContacts(nextContacts: PhoneContact[]) {
  return [...nextContacts];
}

function isFavorite(contact: PhoneContact) {
  return contact.favorited;
}

function buildSearchIndex(nextContacts: PhoneContact[]) {
  const index: Record<string, { name: string; phoneNumber: string }> = {};

  nextContacts.forEach((contact) => {
    index[String(contact.id)] = {
      name: normalizeSearchTerm(contact.name),
      phoneNumber: normalizePhoneNumber(contact.phoneNumber),
    };
  });

  searchIndex = index;
}

function setContactsState(nextContacts: PhoneContact[]) {
  const sortedContacts = sortContacts(nextContacts);
  contacts = sortedContacts;
  buildSearchIndex(sortedContacts);
  return sortedContacts;
}

function getSearchResults() {
  if (!debouncedSearchQuery) {
    return contacts;
  }

  const nameSearchTerm = normalizeSearchTerm(debouncedSearchQuery);
  const phoneSearchTerm = normalizePhoneNumber(debouncedSearchQuery);

  return contacts.filter((contact) => {
    const indexedContact = searchIndex[String(contact.id)];
    if (!indexedContact) {
      return false;
    }

    return indexedContact.name.includes(nameSearchTerm) || indexedContact.phoneNumber.includes(phoneSearchTerm);
  });
}

let searchResults = $derived(getSearchResults());
let favoriteItems = $derived(searchResults.filter(isFavorite));

export const phoneApp = {
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

  get contacts() {
    return contacts;
  },
  recentCalls,
  get searchQuery() {
    return searchQuery;
  },
  get debouncedSearchQuery() {
    return debouncedSearchQuery;
  },
  get favorites() {
    return favoriteItems;
  },
  get filteredContacts() {
    return searchResults;
  },
  async fetchContacts(cloudId: number) {
    if (loadedCloudId === cloudId) {
      return contacts;
    }

    const nextContacts = await SendEvent<FetchContactsResponse, FetchContactsRequest>("fetchContacts", cloudId);
    const sortedContacts = setContactsState(nextContacts || []);
    loadedCloudId = cloudId;
    return sortedContacts;
  },
  setContacts(value: PhoneContact[]) {
    setContactsState(value);
  },
  addContact(contact: PhoneContact) {
    setContactsState([contact, ...contacts]);
  },
  async toggleFavorite(cloudId: number, contactId: number) {
    const contactToUpdate = contacts.find((contact) => contact.id === contactId);
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

    setContactsState(
      contacts.map((contact) => {
        if (contact.id !== result.id) {
          return contact;
        }

        return {
          ...contact,
          favorited: result.favorited,
        };
      }),
    );

    return result;
  },
  navigate(routeId: keyof typeof router.routes, back = false) {
    router.navigate(routeId, back);
  },
  updateSearchQuery(query: string) {
    searchQuery = query;

    if (searchTimer !== null) {
      clearTimeout(searchTimer);
    }

    searchTimer = setTimeout(() => {
      debouncedSearchQuery = normalizeSearchTerm(searchQuery);
      searchTimer = null;
    }, SEARCH_DEBOUNCE_MS) as unknown as number;
  },
  reset() {
    router.reset();
    searchQuery = "";
    debouncedSearchQuery = "";

    if (searchTimer !== null) {
      clearTimeout(searchTimer);
      searchTimer = null;
    }
  },
};
