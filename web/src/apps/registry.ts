import type { AppDefinition } from "$apps/types";

import BleeterApp from "$apps/bleeter/bleeter-app.svelte";
import CameraApp from "$apps/camera/camera-app.svelte";
import MailApp from "$apps/mail/mail-app.svelte";
import MessagesApp from "$apps/messages/messages-app.svelte";
import PhoneApp from "$apps/phone/phone-app.svelte";
import SettingsApp from "$apps/settings/settings-app.svelte";
import GalleryApp from "./gallery/gallery-app.svelte";

export const appRegistry = [
  {
    id: "phone",
    label: "Phone",
    component: PhoneApp,
  },
  {
    id: "settings",
    label: "Settings",
    component: SettingsApp,
  },
  {
    id: "messages",
    label: "Messages",
    component: MessagesApp,
  },
  {
    id: "mail",
    label: "Mail",
    component: MailApp,
  },
  {
    id: "bleeter",
    label: "Bleeter",
    component: BleeterApp,
  },
  {
    id: "camera",
    label: "Camera",
    component: CameraApp,
  },
  {
    id: "gallery",
    label: "Gallery",
    component: GalleryApp,
  },
] satisfies AppDefinition[];
