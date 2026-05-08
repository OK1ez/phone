import type { DebugEventCallback } from "../types/events";
import type { NotificationPayload } from "../types/notifications";
import { ReceiveEvent } from "./eventsHandlers";

import { phone } from "$phone/state/phone.svelte";
import type { OpenPhonePayload } from "$phone/state/types";
import { notifications } from "$phone/state/notifications.svelte";

const AlwaysListened: DebugEventCallback[] = [
  {
    action: "openPhone",
    handler: (data: OpenPhonePayload) => {
      phone.openPhone(data);
    },
  },
  {
    action: "showNotification",
    handler: (data: NotificationPayload) => {
      notifications.enqueue({
        appId: data.app ?? "",
        title: data.title ?? "",
        body: data.content ?? "",
      });
    },
  },
];

export function InitialiseListeners() {
  for (const debug of AlwaysListened) {
    if (debug.handler) {
      ReceiveEvent(debug.action, debug.handler);
    }
  }
}

export default AlwaysListened;
