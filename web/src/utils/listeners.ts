import type { DebugEventCallback } from "@/typings/events";
import { ReceiveEvent } from "./eventsHandlers";
import { VISIBLE } from "@/stores/stores";
import { get } from "svelte/store";

const AlwaysListened: DebugEventCallback[] = [
  {
    action: "phone:visible",
    handler: (data: any) => {
      VISIBLE.set(data.visible ? "visible" : "hidden");
      console.log("phone:visible", get(VISIBLE));
    },
  },
];

export default AlwaysListened;

export function InitialiseListen() {
  for (const debug of AlwaysListened) {
    ReceiveEvent(debug.action, debug.handler);
  }
}
