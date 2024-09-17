import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft } from "lucide-react";

interface SettingsCloudPageProps {
  onBack: () => void;
}

export default function SettingsCloudPage({ onBack }: SettingsCloudPageProps) {
  return(
    <>
      <header className="flex items-center w-full gap-4 px-6 pb-4 mt-[4.5rem] border-b">
        <button onClick={onBack} className="text-gray-400 hover:text-foreground" aria-label="Return to settings">
          <ChevronLeft className="w-6 h-6 text-gray-400 hover:text-foreground" />
        </button>
        <p className="font-medium">Cloud</p>
      </header>
      <ScrollArea className="flex flex-col flex-grow w-full overflow-y-auto">
        <div className="p-6">Cloud things here</div>
      </ScrollArea>
    </>
  )
}