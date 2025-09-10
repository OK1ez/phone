import type { DebugItem } from "../../types/events";
import { DebugEventSend, SendEvent } from "../eventsHandlers";

const SendDebuggers: DebugItem[] = [
  {
    label: "Visibility",
    actions: [
      {
        label: "Toggle",
        action: (value: boolean) => DebugEventSend("visible", !value),
        value: false,
        type: "checkbox",
      },
    ],
  },
  // {
  //   label: "Slider",
  //   actions: [
  //     {
  //       label: "Change Value",
  //       action: (value: number) => DebugEventSend(Send.imageResize, value),
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
  //       action: (value: boolean) => DebugEventSend(Send.imageInvert, value),
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
  //       action: (value: string) => DebugEventSend(Send.changeText, value),
  //       type: "text",
  //       placeholder: "Type here",
  //     },
  //   ],
  // },
  // {
  //   label: "Button",
  //   actions: [
  //     {
  //       label: "Reset Text",
  //       action: () => DebugEventSend(Send.resetText),
  //     },
  //   ],
  // },
];

export default SendDebuggers;
