import { writable } from "svelte/store";

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  isGroup: boolean;
  messages: Message[];
}

const initialConversations: Conversation[] = [
  {
    id: "1",
    name: "OKiez",
    lastMessage: "Just got the new phone!",
    lastMessageTime: "16:16",
    isGroup: false,
    messages: [
      {
        id: "1",
        content: "Hey, how's it going?",
        sender: "OKiez",
        timestamp: "16:15",
      },
      {
        id: "2",
        content: "Just got the new phone!",
        sender: "me",
        timestamp: "16:16",
      },
    ],
  },
  {
    id: "2",
    name: "Mads",
    lastMessage: "Cool phone",
    lastMessageTime: "14:42",
    isGroup: false,
    messages: [
      {
        id: "1",
        content: "Have you seen the new phone?",
        sender: "Mads",
        timestamp: "14:41",
      },
      { id: "2", content: "Cool phone", sender: "me", timestamp: "14:42" },
    ],
  },
  {
    id: "3",
    name: "Group Chat",
    lastMessage: "Hello!",
    lastMessageTime: "12:50",
    isGroup: true,
    messages: [
      {
        id: "1",
        content: "Hello everyone!",
        sender: "John",
        timestamp: "12:49",
      },
      { id: "2", content: "Hello!", sender: "me", timestamp: "12:50" },
    ],
  },
];

export const CONVERSATIONS = writable<Conversation[]>(initialConversations);
export const ACTIVE_PAGE = writable<"recent" | "conversation">("recent");
export const SELECTED_CONVERSATION_ID = writable<string | null>(null);

export function getConversation(id: string): Conversation | undefined {
  return initialConversations.find((conv) => conv.id === id);
}

export function goBack() {
  ACTIVE_PAGE.set("recent");
  SELECTED_CONVERSATION_ID.set(null);
}

export function openConversation(id: string) {
  SELECTED_CONVERSATION_ID.set(id);
  ACTIVE_PAGE.set("conversation");
}
