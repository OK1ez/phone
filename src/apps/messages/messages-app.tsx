import { ChevronRight, PlusCircle, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"

function Message() {
  return(
    <button className="flex flex-col w-full px-6 py-4 text-left border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
      <div className="flex justify-between w-full">
        <span className="text-base font-medium">Mads</span>
        <div className="flex items-center space-x-2 text-gray-400">
          <span className="text-sm">16:16</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
      <span className="text-sm text-gray-400">Cool phone, Cool phone, Cool phone,Cool phone ,Cool phone, Cool phone,Cool phone</span>
    </button>
  )
}

export function MessagesApp() {
  return (
    <div className="flex flex-col w-full h-full bg-background">
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
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </ScrollArea>
    </div>
  );
  }