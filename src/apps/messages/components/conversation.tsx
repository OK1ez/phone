import { ChevronLeft, Phone } from "lucide-react";
import { motion } from "framer-motion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"


function ConversationInfo({ name }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="text-lg font-medium">
          <p>{name}</p>
        </button>
      </DrawerTrigger>
      <DrawerContent className="absolute">
        <DrawerHeader>
          <DrawerTitle>Conversation Info</DrawerTitle>
          <DrawerDescription>Details about {name}</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 overflow-y-auto">
          <p>This is the conversation info for {name}.</p>
          <p>You can add more details, settings, or options here.</p>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export function ConversationView({ conversation, onBack }) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute z-20 w-full h-full overflow-hidden bg-background"
    >
      <header className="flex items-center justify-between w-full gap-4 px-6 pb-4 mt-16 border-b">
        <button onClick={onBack}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <ConversationInfo name={conversation.name} />
        <button>
          <Phone className="w-5 h-5 fill-foreground" />
        </button>
      </header>
      <div className="flex flex-col p-6 overflow-y-auto">
        <p>Messages and content go here</p>
      </div>
    </motion.div>
  );
}