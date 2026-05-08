import type { DebugItem } from "$lib/types/events";

import { phone } from "$phone/state/phone.svelte";
import { DebugEventSend, SendEvent } from "../eventsHandlers";

/**
 * The debug actions that will show up in the debug menu.
 */
export function createDebugSenders(): DebugItem[] {
  return [
    {
      label: "Phone",
      actions: [
        {
          label: "Open",
          action: () => DebugEventSend("openPhone", { phoneId: 3, cloudId: 1 }),
        },
        {
          label: "Open Locked",
          action: () => DebugEventSend("openPhone", { phoneId: 2, cloudId: 2 }),
        },
        {
          label: "Setup",
          action: () => DebugEventSend("openPhone", { phoneId: 1, cloudId: null }),
        },
        {
          label: "Close",
          action: () => phone.hide(),
        },
        {
          label: "Notification",
          action: () =>
            DebugEventSend("showNotification", {
              app: "phone",
              title: "Test Notification",
              content: "Content Here",
            }),
        },
      ],
    },
    // {
    //   label: "Slider",
    //   actions: [
    //     {
    //       label: "Change Value",
    //       action: (value: number) => DebugEventSend("", value),
    //       value: 50,
    //       type: "slider",
    //     },
    //   ],
    // },
    // {
    //   label: "Checkbox",
    //   actions: [
    //     {
    //       label: "Toggle",
    //       action: (value: boolean) => DebugEventSend("", value),
    //       value: false,
    //       type: "checkbox",
    //     },
    //   ],
    // },
    // {
    //   label: "Text",
    //   actions: [
    //     {
    //       label: "Type",
    //       action: (value: string) => DebugEventSend("", value),
    //       type: "text",
    //       placeholder: "Type here",
    //       value: "",
    //     },
    //   ],
    // },

    {
      label: "Debug Receiver",
      actions: [
        {
          label: "Reverse Text",
          type: "text",
          placeholder: "Type text to reverse.",
          value: "",
          action: (value: string) =>
            SendEvent<string, string>("debug", value).then((reversed) =>
              console.log(reversed, "color: red", "color: white", "color: green"),
            ),
        },
      ],
    },
  ];
}
