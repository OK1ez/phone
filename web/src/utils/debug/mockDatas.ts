export const mockConversations = {
  1: {
    id: 1,
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
  2: {
    id: 2,
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

export const mockContacts = [
  { id: 1, name: "OKiez" },
  { id: 2, name: "Mads" },
  { id: 3, name: "John" },
  { id: 4, name: "Petter" },
];

export const mockFavorites = [
  { id: 1, name: "OKiez", avatar: "https://github.com/ok1ez.png" },
  { id: 2, name: "Mads", avatar: "https://github.com/madsleander.png" },
];

export const mockRecentCalls = [
  { id: 1, name: "OKiez", time: "17:53", missed: true },
  { id: 2, name: "OKiez", time: "Yesterday", missed: false },
  { id: 3, name: "Mads", time: "2 days ago", missed: false },
  { id: 4, name: "John", time: "1 week ago", missed: false },
];

export const mockMails = {
  1: {
    id: 1,
    subject: "Important Meeting",
    sender: "boss@company.com",
    content:
      "We need to discuss the upcoming project. Please prepare a brief summary.",
    timestamp: "Yesterday",
  },
  2: {
    id: 2,
    subject: "Lunch Plans",
    sender: "friend@email.com",
    content:
      "Hey, want to grab lunch tomorrow? I know a great new place downtown.",
    timestamp: "1 week ago",
  },
};
