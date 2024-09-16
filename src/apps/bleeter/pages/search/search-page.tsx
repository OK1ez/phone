// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Bleet } from "../../components/bleet";
import { Search } from "lucide-react";

export function BleeterSearchPage() {
  return(
    <>
      <header className="flex flex-col w-full pb-4 border-b">
        <div className="flex items-center justify-between w-full h-12 gap-4 px-6 mt-16">
          <div className="flex items-center w-full h-12 gap-2 px-4 text-lg font-medium transition-all rounded-full bg-secondary dark:bg-secondary/30">
            <Search className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search"
              // value={"okiez"}
              className="font-normal bg-transparent min-w-14 focus:outline-none" 
            />
          </div>
        </div>
      </header>

      <ScrollArea className="flex flex-col w-full h-full max-h-[49.5rem] overflow-y-auto">
        <div className="flex items-center w-full h-16 gap-2 px-6 border-b">
          <Avatar>
            <AvatarImage src="https://github.com/ok1ez.png" />
            <AvatarFallback>O</AvatarFallback>
          </Avatar>
          <span>OKiez</span>
        </div>
      </ScrollArea>
    </>
  )
}