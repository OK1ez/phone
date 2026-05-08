import type { DebugEventCallback } from "$lib/types/events";
import type { GalleryMediaAsset } from "$apps/gallery/media";
import type { PhoneContact } from "$apps/phone/state/phone-app.svelte";
import { DebugEventReceive } from "../eventsHandlers";
import { createDebugPhoneContacts, createDebugPhoneData, debugSetupClouds } from "./data";

const debugLockedClouds = new Set([2]);

type CreateCloudRequest = {
  phoneId: number;
  name: string;
  pin: string;
};

type AttachCloudRequest = {
  phoneId: number;
  cloudId: number;
};

type UnlockPhoneRequest = {
  cloudId: number;
  pin: string;
};

type SearchPhoneContactsRequest = {
  cloudId: number;
  query: string;
};

type AddPhoneContactRequest = {
  cloudId: number;
  name: string;
  phoneNumber: string;
};

type ToggleFavoriteRequest = {
  cloudId: number;
  contactId: number;
  favorited: boolean;
};

const debugContacts = createDebugPhoneContacts();
const debugGalleryMedia: GalleryMediaAsset[] = [
  {
    id: "debug-gallery-image-1",
    type: "image",
    url: "https://r2.fivemanage.com/Yl9OcgxACkrz1IbRcV7P2/camera/phone-image-2026-04-14T15-41-59-947Z.webp",
    alt: "Gallery photo",
    timestamp: new Date().toISOString(),
  },
];

/**
 * These Receivers will emulate what the client receives from the UI.
 * The purpose of this is to test the UI without having to run the client.
 * You are supposed to pretend to process the data you receive here and return.
 */
const ReceiveDebuggers: DebugEventCallback[] = [
  {
    action: "closePhone",
    handler: (success: boolean) => {
      console.log("phone closed", success);
    },
  },
  {
    action: "getShell",
    handler: (cloudId: number) => {
      if (debugLockedClouds.has(cloudId)) {
        return {
          state: "locked",
          cloudId,
        };
      }

      return {
        state: "unlocked",
        data: createDebugPhoneData(cloudId),
      };
    },
  },
  {
    action: "fetchOwnedClouds",
    handler: () => {
      return debugSetupClouds;
    },
  },
  {
    action: "unlockPhone",
    handler: (data: UnlockPhoneRequest) => {
      if (data.pin !== "1234") {
        return false;
      }

      return createDebugPhoneData(data.cloudId);
    },
  },
  {
    action: "createCloud",
    handler: (_data: CreateCloudRequest) => {
      return createDebugPhoneData(3);
    },
  },
  {
    action: "attachCloud",
    handler: (data: AttachCloudRequest) => {
      return createDebugPhoneData(data.cloudId);
    },
  },
  {
    action: "fetchContacts",
    handler: (_cloudId: number) => {
      return debugContacts;
    },
  },
  {
    action: "searchContacts",
    handler: (data: SearchPhoneContactsRequest) => {
      const query = data.query.trim().toLowerCase();
      if (query === "") {
        return debugContacts;
      }

      return debugContacts.filter((contact) => {
        return contact.name.toLowerCase().includes(query) || String(contact.phoneNumber).includes(query);
      });
    },
  },
  {
    action: "addContact",
    handler: (data: AddPhoneContactRequest) => {
      const nextContact: PhoneContact = {
        id: debugContacts.length + 1,
        name: data.name.trim(),
        phoneNumber: data.phoneNumber.trim(),
        avatar: null,
        favorited: false,
      };

      debugContacts.unshift(nextContact);
      return nextContact;
    },
  },
  {
    action: "toggleFavorite",
    handler: (data: ToggleFavoriteRequest) => {
      const contact = debugContacts.find((item) => item.id === data.contactId);
      if (!contact) {
        return false;
      }

      contact.favorited = data.favorited;
      return {
        id: contact.id,
        favorited: contact.favorited,
      };
    },
  },
  {
    action: "fetchGallery",
    handler: (_cloudId: number) => {
      return debugGalleryMedia;
    },
  },
  {
    action: "getUploadURL",
    handler: () => {
      return "debug-upload-url";
    },
  },
  {
    action: "saveMedia",
    handler: (data: { cloudId: number; url: string; type: "image" | "video" }) => {
      const nextMedia = {
        id: `debug-gallery-${debugGalleryMedia.length + 1}`,
        url: data.url,
        type: data.type,
        alt: data.type === "video" ? "Recorded video" : "Gallery photo",
        timestamp: new Date().toISOString(),
      } satisfies GalleryMediaAsset;

      debugGalleryMedia.unshift(nextMedia);
      return nextMedia;
    },
  },
  {
    action: "debug",
    handler: (data: string) => {
      const init = "Emulates an NUICallback times. Process the data here.";

      if (typeof data !== "string") {
        return `${init} \n The data is not a string.`;
      }

      const reverse = data.split("").reverse().join("");

      const message = `${init} \n The reverse of %c${data} %cis %c${reverse}`;

      return message;
    },
  },
];

export default ReceiveDebuggers;

/**
 * Initialise the debug receivers
 */
export function InitialiseDebugReceivers(): void {
  for (const debug of ReceiveDebuggers) {
    DebugEventReceive(debug.action, debug.handler);
  }
}
