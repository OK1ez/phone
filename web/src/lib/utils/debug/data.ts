import type { PhoneCloudAccount, PhoneDataResponse } from "$phone/state/types";
import type { PhoneContact } from "$apps/phone/state/phone-app.svelte";

export const locales = {
  nui_sidebar_expand: "Expand",
  nui_sidebar_actions: "Actions",
};

export const debugSetupClouds: PhoneCloudAccount[] = [
  { cloudId: 1, name: "Main phone", phoneNumber: 95225924 },
  { cloudId: 2, name: "Work phone", phoneNumber: 63215323 },
];

export function createDebugPhoneData(cloudId = 1): PhoneDataResponse {
  return {
    cloudId,
    name: "Test Testing",
    phoneNumber: 92373881,
    owner: 5,
    settings: {
      device: {
        airplaneMode: false,
        streamerMode: false,
      },
      notifications: {
        muted: false,
        preferences: {},
      },
      appearance: {
        wallpaperId: null,
      },
    },
  };
}

export function createDebugPhoneContacts(): PhoneContact[] {
  return [
    {
      id: 1,
      name: "sdf dsf sf ssf sf sdf sfsf sf s fsf",
      phoneNumber: "40011111",
      avatar: null,
      favorited: true,
    },
    {
      id: 2,
      name: "Mads",
      phoneNumber: "40022222",
      avatar: null,
      favorited: true,
    },
    {
      id: 3,
      name: "Zoo",
      phoneNumber: "40033333",
      avatar: null,
      favorited: false,
    },
  ];
}
