import { ChevronLeft, Images, Mic, Phone, Smile } from "lucide-react";
import { motion } from "framer-motion";
import {
  DrawerContent,
  Drawer,
  DrawerTrigger
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface ConversationInfoProps {
  name: string;
}

function ConversationInfo({ name }: ConversationInfoProps) {
  return (
    <Drawer>
      <DrawerTrigger className="font-bold font-base">{name}</DrawerTrigger>
      <DrawerContent className="items-center text-center ">
        <h2 className="text-2xl font-bold">{name}</h2>
        <div className="w-full h-24 mt-4 border rounded-lg">
          what is the reson for this, i dont know
        </div>
        <Button className="w-full mt-4">
          Share posistion
        </Button>
      </DrawerContent>
    </Drawer>
  );
}

interface Conversation {
  name: string;
}

interface ConversationViewProps {
  conversation: Conversation;
  onBack: () => void;
}

export function ConversationView({ conversation, onBack }: ConversationViewProps) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 35 }}
      className="absolute z-20 flex flex-col w-full h-full overflow-hidden bg-background"
    >
      <header className="flex items-center justify-between w-full gap-4 px-6 pb-4 mt-[4.5rem] border-b">
        <button onClick={onBack}>
          <ChevronLeft className="w-6 h-6 text-gray-400 hover:text-foreground" />
        </button>
        <ConversationInfo name={conversation.name} />
        <button>
          <Phone className="w-5 h-5 text-gray-400 hover:text-foreground" />
        </button>
      </header>
      
      <ScrollArea className="flex-grow w-full p-6 pb-0 overflow-y-auto">
        <div className="flex justify-end w-full mb-4">
          <div className="px-4 py-3 rounded-br-none bg-sky-400 dark:bg-sky-600 rounded-2xl max-w-72 ">
            Nice phone
          </div>
        </div>
        <div className="flex justify-start w-full mb-4">
          <div className="px-4 py-3 rounded-bl-none bg-secondary rounded-2xl max-w-72 ">
            Thanks
          </div>
        </div>
      </ScrollArea>

      <div className="flex w-full gap-4 px-6 pt-4 border-t pb-14 min-h-24 bg-backgroun">
        <button className="flex items-center justify-center h-12 rounded-full min-w-12 bg-secondary dark:bg-secondary/30 group">
          <Mic className="w-5 h-5 text-gray-400 group-hover:text-foreground" />
        </button>
        <div className="flex items-center w-full h-12 gap-4 px-4 text-lg font-medium transition-all rounded-full bg-secondary dark:bg-secondary/30">
          <input 
            type="text" 
            placeholder="Type here..." 
            className="flex-grow font-normal bg-transparent min-w-14 focus:outline-none" 
          />
          <button>
            <Images className="w-5 h-5 text-gray-400 hover:text-foreground" />
          </button>
          <button >
            <Smile className="w-5 h-5 text-gray-400 hover:text-foreground" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

