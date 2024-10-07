import type { DebugEventCallback } from "@/typings/events";
import { ReceiveEvent } from "./eventsHandlers";
import { VISIBLE } from "@/stores/stores";

const AlwaysListened: DebugEventCallback[] = [
  {
    action: "phone:visible",
    handler: () => {
      VISIBLE.set(true);
    },
  },
];

export default AlwaysListened;

export function InitialiseListen() {
  for (const debug of AlwaysListened) {
    ReceiveEvent(debug.action, debug.handler);
  }
}
