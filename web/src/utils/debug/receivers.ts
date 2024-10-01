import type { DebugEventCallback } from "@/typings/events";
import { DebugEventReceive } from "@/utils/eventsHandlers";

const mockConversations = {
  "1": {
    id: "1",
    name: "Alice",
    messages: [
      {
        sender: "me",
        content: "Hey Alice, how are you?",
        timestamp: new Date().toISOString(),
      },
      {
        sender: "other",
        content: "Hi! I'm good, thanks. How about you?",
        timestamp: new Date().toISOString(),
      },
      {
        sender: "me",
        content: "I'm doing well. Want to grab coffee later?",
        timestamp: new Date().toISOString(),
      },
    ],
  },
  "2": {
    id: "2",
    name: "Bob",
    messages: [
      {
        sender: "other",
        content: "Hey, are we still on for the movie tonight?",
        timestamp: new Date().toISOString(),
      },
      {
        sender: "me",
        content: "Absolutely! What time should we meet?",
        timestamp: new Date().toISOString(),
      },
      {
        sender: "other",
        content: "How about 7pm at the usual place?",
        timestamp: new Date().toISOString(),
      },
    ],
  },
};

/**
 * These Receivers will emulate what the client receives from the UI.
 * The purpose of this is to test the UI without having to run the client.
 * You are supposed to pretend to process the data you receive here and return.
 */
const ReceiveDebuggers: DebugEventCallback[] = [
  {
    action: "messages:fetchConversation",
    handler: (conversationId: string) => {
      return (
        mockConversations[conversationId] || {
          id: conversationId,
          name: "Unknown",
          messages: [
            {
              sender: "system",
              content: "No messages found",
              timestamp: new Date().toISOString(),
            },
          ],
        }
      );
    },
  },
  {
    action: "messages:fetchRecents",
    handler: () => {
      // Return mock recent conversations
      return [
        {
          id: "1",
          name: "Alice",
          lastMessage: "Hey, how are you?",
          lastMessageTime: "10:30 AM",
        },
        {
          id: "2",
          name: "Bob",
          lastMessage: "See you later!",
          lastMessageTime: "Yesterday",
        },
        // Add more mock conversations as needed
      ];
    },
  },
  {
    action: "resource:close",
    handler: () => {
      console.log("closed");
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
