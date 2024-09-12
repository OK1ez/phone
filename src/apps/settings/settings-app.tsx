import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { AudioLines, BellDot, ChevronRight, Image, PlaneTakeoff, ScanFace, Settings, Smartphone, Video } from "lucide-react";

export function SettingsApp() {
  return (
    <div className="flex flex-col w-full h-full bg-background">
      <header className="flex flex-col w-full pb-4 border-b">
        <div className="flex items-center justify-center w-full h-5 gap-4 px-6 mt-16">
          <p className="font-medium">Settings</p>
        </div>
      </header>
      <ScrollArea className="">
        <button className="flex items-center justify-between w-full h-20 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>
                O
              </AvatarFallback>
              <AvatarImage src="github.com/" />
            </Avatar>
            <p>Cloud backup</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
        <button className="flex items-center justify-between w-full px-6 border-b h-14 hover:bg-secondary/70 dark:hover:bg-secondary/20">
          <div className="flex items-center space-x-4">
            <PlaneTakeoff />
            <p>Airplane mode</p>
          </div>
          <Switch />
        </button>
        <button className="flex items-center justify-between w-full px-6 border-b h-14 hover:bg-secondary/70 dark:hover:bg-secondary/20">
          <div className="flex items-center space-x-4">
            <Video />
            <p>Streamer mode</p>
          </div>
          <Switch />
        </button>
        <button className="flex items-center justify-between w-full px-6 border-b h-14 hover:bg-secondary/70 dark:hover:bg-secondary/20">
          <div className="flex items-center space-x-4">
            <BellDot />
            <p>Notifications</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
        <button className="flex items-center justify-between w-full px-6 border-b h-14 hover:bg-secondary/70 dark:hover:bg-secondary/20">
          <div className="flex items-center space-x-4">
            <AudioLines />
            <p>Sounds</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
        <button className="flex items-center justify-between w-full px-6 border-b h-14 hover:bg-secondary/70 dark:hover:bg-secondary/20">
          <div className="flex items-center space-x-4">
            <Settings />
            <p>General</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
        <button className="flex items-center justify-between w-full px-6 border-b h-14 hover:bg-secondary/70 dark:hover:bg-secondary/20">
          <div className="flex items-center space-x-4">
            <ScanFace />
            <p>Unlock</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
        <button className="flex items-center justify-between w-full px-6 border-b h-14 hover:bg-secondary/70 dark:hover:bg-secondary/20">
          <div className="flex items-center space-x-4">
            <Smartphone />
            <p>Display and brightness</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
        <button className="flex items-center justify-between w-full px-6 border-b h-14 hover:bg-secondary/70 dark:hover:bg-secondary/20">
          <div className="flex items-center space-x-4">
            <Image />
            <p>Wallpapers</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </ScrollArea>
      {/* <div className="w-full py-4 text-center">
        <p className="text-gray-400">Version 1.0.0</p>
      </div> */}
    </div>
  );
}