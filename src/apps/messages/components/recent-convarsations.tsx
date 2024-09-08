import { ChevronRight, PlusCircle, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { ConversationView } from "./conversation";
import { AnimatePresence, motion } from "framer-motion";

const mockConversations = [
  {
    id: 1,
    name: "Mads",
    message: "Cool phone, Cool phone, Cool phone, Cool phone, Cool phone, Cool phone, Cool phone, Cool phone, Cool phone",
    time: "16:16"
  },
  {
    id: 2,
    name: "Alice",
    message: "Just got the new phone!",
    time: "14:12"
  },
  {
    id: 3,
    name: "John",
    message: "Let's catch up later!",
    time: "13:00"
  },
  {
    id: 4,
    name: "John",
    message: "Let's catch up later!",
    time: "13:00"
  },
  {
    id: 5,
    name: "John",
    message: "Let's catch up later!",
    time: "13:00"
  },
  {
    id: 6,
    name: "John",
    message: "Let's catch up later!",
    time: "13:00"
  },
  {
    id: 7,
    name: "John",
    message: "Let's catch up later!",
    time: "13:00"
  },
  {
    id: 8,
    name: "John",
    message: "Let's catch up later!",
    time: "13:00"
  },
  {
    id: 9,
    name: "John",
    message: "Let's catch up later!",
    time: "13:00"
  },
  {
    id: 10,
    name: "John",
    message: "Let's catch up later!",
    time: "13:00"
  },
  {
    id: 11,
    name: "John",
    message: "Let's catch up later!",
    time: "13:00"
  },
  {
    id: 12,
    name: "John",
    message: "Let's catch up later!",
    time: "13:00"
  },
];

function truncateMessage(message, maxLength = 100) {
  return message.length > maxLength ? `${message.slice(0, maxLength)}..` : message;
}

function Message({ name, message, time, onClick }) {
  return (
    <button 
      className="flex flex-col w-full px-6 py-4 text-left border-b hover:bg-secondary/70 dark:hover:bg-secondary/20"
      onClick={onClick}
    >
      <div className="flex justify-between w-full">
        <span className="text-base font-medium">{name}</span>
        <div className="flex items-center space-x-2 text-gray-400">
          <span className="text-sm">{time}</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
      <span className="text-sm text-gray-400">
        {truncateMessage(message)}
      </span>
    </button>
  );
}

export function RecentConversations() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [hasBacked, setHasBacked] = useState(false);

  useEffect(() => {
    if (selectedConversation) {
      setHasBacked(true);
    }
  }, [selectedConversation]);

  return (
    <AnimatePresence>
      {selectedConversation ? (
        <ConversationView 
          key="conversationView" 
          conversation={selectedConversation} 
          onBack={() => {
            setSelectedConversation(null);
            setHasBacked(true); // Ensure to set the flag when navigating back
          }} 
        />
      ) : (
        <motion.div
          key="recentConversations"
          initial={hasBacked ? { x: "-100%" } : false} // Do not animate on initial render
          animate={{ x: 0 }}
          exit={hasBacked ? { x: "-100%" } : false} // Do not animate on initial render
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <header className="flex items-center justify-between w-full gap-4 px-6 pb-4 mt-16 border-b">
            <div className="flex items-center w-full h-12 gap-2 px-4 text-lg font-medium transition-all rounded-full bg-secondary dark:bg-secondary/30">
              <Search className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search" 
                className="font-normal bg-transparent min-w-14 focus:outline-none" 
              />
            </div>
            <button>
              <PlusCircle />
            </button>
          </header>
          <ScrollArea className="flex flex-col w-full h-full max-h-[57rem] overflow-y-auto">
            {mockConversations.map(conversation => (
              <Message 
                key={conversation.id} 
                name={conversation.name} 
                message={conversation.message} 
                time={conversation.time} 
                onClick={() => setSelectedConversation(conversation)}
              />
            ))}
          </ScrollArea>
        </motion.div>
      )}
    </AnimatePresence>
  );
}