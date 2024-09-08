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
    name: "Maya",
    message: "Hey, did you see the latest episode?",
    time: "12:45"
  },
  {
    id: 5,
    name: "Liam",
    message: "Lunch tomorrow?",
    time: "11:30"
  },
  {
    id: 6,
    name: "Olivia",
    message: "Meeting at 2 PM.",
    time: "10:15"
  },
  {
    id: 7,
    name: "Noah",
    message: "Can you review this document?",
    time: "09:00"
  },
  {
    id: 8,
    name: "Emma",
    message: "How was the concert?",
    time: "08:50"
  },
  {
    id: 9,
    name: "Ava",
    message: "Reminder: team meeting at 3.",
    time: "08:30"
  },
  {
    id: 10,
    name: "Sophia",
    message: "Happy birthday!",
    time: "07:45"
  },
  {
    id: 11,
    name: "Jackson",
    message: "Finished the report.",
    time: "07:30"
  },
  {
    id: 12,
    name: "Lucas",
    message: "Are we still on for tonight?",
    time: "07:00"
  },
];

function truncateMessage(message: string, maxLength: number = 100): string {
  return message.length > maxLength ? `${message.slice(0, maxLength)}..` : message;
}

interface MessageProps {
  name: string;
  message: string;
  time: string;
  onClick: () => void;
}

function Message({ name, message, time, onClick }: MessageProps) {
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

interface Conversation {
  id: number;
  name: string;
  message: string;
  time: string;
}

export function RecentConversations() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
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
            setHasBacked(true);
          }} 
        />
      ) : (
        <motion.div
          key="recentConversations"
          initial={hasBacked ? { x: "-100%" } : {}}
          animate={{ x: 0 }}
          exit={hasBacked ? { x: "-100%" } : {}}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <header className="flex items-center justify-between w-full gap-4 px-6 pb-4 mt-[4.5rem] border-b">
            <div className="flex items-center w-full h-12 gap-2 px-4 text-lg font-medium transition-all rounded-full bg-secondary dark:bg-secondary/30">
              <Search className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search" 
                className="font-normal bg-transparent min-w-14 focus:outline-none" 
              />
            </div>
            <button className="flex items-center justify-center h-12 rounded-full min-w-12 bg-secondary dark:bg-secondary/30 group">
              <PlusCircle className="w-5 h-5 text-gray-400 group-hover:text-foreground" />
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
