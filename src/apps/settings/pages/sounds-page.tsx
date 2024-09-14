import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft } from "lucide-react";

interface SettingsSoundsPageProps {
  onBack: () => void;
}

export default function SettingsSoundsPage({ onBack }: SettingsSoundsPageProps) {
  return(
    <>
      <header className="flex items-center w-full gap-4 px-6 pb-4 mt-[4.5rem] border-b">
        <button onClick={onBack} className="text-gray-400 hover:text-foreground">
          <ChevronLeft className="w-6 h-6 text-gray-400 hover:text-foreground" />
        </button>
        <p className="font-medium">General</p>
      </header>
      <ScrollArea className="flex flex-col flex-grow w-full overflow-y-auto">
        <div>
          Sounds and shit, todo: see if gta has cool native audio sounds
        </div>
      </ScrollArea>
    </>
  )
}