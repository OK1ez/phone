import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SettingsGeneralPageProps {
  onBack: () => void;
}

export default function SettingsGeneralPage({ onBack }: SettingsGeneralPageProps) {
  return (
    <>
      <header className="flex items-center w-full gap-4 px-6 pb-4 mt-[4.5rem] border-b">
        <button onClick={onBack} className="text-gray-400 hover:text-foreground">
          <ChevronLeft className="w-6 h-6 text-gray-400 hover:text-foreground" />
        </button>
        <p className="font-medium">General</p>
      </header>
      <ScrollArea className="flex flex-col flex-grow w-full overflow-y-auto">
        <button className="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
          <div className="flex items-center text-left">
            <p className="text-base">About</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
        <button className="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
          <div className="flex items-center text-left">
            <p className="text-base">Software updates</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
        <button className="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
          <div className="flex items-center text-left">
            <p className="text-base">Air transfer</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
        <button className="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
          <div className="flex items-center text-left">
            <p className="text-base">Reset phone</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </ScrollArea>
    </>
  )
}