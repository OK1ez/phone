import type { DebugEventCallback } from "../types/events";
import type { NotificationPayload } from "../types/notifications";
import { ReceiveEvent } from "./eventsHandlers";

import { phone } from "$phone/state/phone.svelte";
import type { CallMessage, OpenPhonePayload } from "$phone/state/types";
import { notifications } from "$phone/state/notifications.svelte";
import { calls } from "$phone/state/calls.svelte";

const AlwaysListened: DebugEventCallback[] = [
  // TODO
  {
    action: "openPhone",
    handler: (data: OpenPhonePayload) => {
      phone.openPhone(data);
      console.log(data.cloudId);
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
  {
    action: "callMessage",
    handler: (data: CallMessage) => {
      calls.handleCallMessage(data);
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
