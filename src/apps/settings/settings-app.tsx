import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { AudioLines, BellDot, ChevronLeft, ChevronRight, Cloud, Image, PlaneTakeoff, ScanFace, Settings, Smartphone, Video } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from "react";
import SettingsCloudPage from "./pages/cloud-page";
import SettingsNotificationsPage from "./pages/notification-page";
import SettingsGeneralPage from "./pages/general-page";
import SettingsSoundsPage from "./pages/sounds-page";
import SettingsUnlockPage from "./pages/unlock-page";
import SettingsDisplayPage from "./pages/display-page";
import SettingsWallpapersPage from "./pages/wallpapers-page";

export function SettingsApp() {
  const [selectedSetting, setselectedSetting] = useState<string | null>(null);
  const [hasBacked, setHasBacked] = useState(false);
  const [isAirplaneModeOn, setIsAirplaneModeOn] = useState(false);
  const [isStreamerModeOn, setIsStreamerModeOn] = useState(false);

  useEffect(() => {
    if (selectedSetting) {
      setHasBacked(true);
    }
  }, [selectedSetting]);

  const onBack = () => {
    setselectedSetting(null);
    setHasBacked(true);
  };

  const toggleAirplaneMode = () => setIsAirplaneModeOn(prev => !prev);
  const toggleStreamerMode = () => setIsStreamerModeOn(prev => !prev);

  const renderSelectedPage = () => {
    switch (selectedSetting) {
      case 'cloud': return <SettingsCloudPage onBack={onBack} />;
      case 'general': return <SettingsGeneralPage onBack={onBack} />;
      case 'notifications': return <SettingsNotificationsPage onBack={onBack} />;
      case 'sounds': return <SettingsSoundsPage onBack={onBack} />;
      case 'unlock': return <SettingsUnlockPage onBack={onBack} />;
      case 'display': return <SettingsDisplayPage onBack={onBack} />;
      case 'wallpapers': return <SettingsWallpapersPage onBack={onBack} />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-background">
      <AnimatePresence>
        {selectedSetting ? (
          <motion.div
            key={selectedSetting}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className="absolute z-20 flex flex-col w-full h-full overflow-hidden bg-background"
          >
            <header className="flex items-center w-full gap-4 px-6 pb-4 mt-[4.5rem] border-b">
              <button onClick={onBack} className="text-gray-400 hover:text-foreground">
              <ChevronLeft className="w-6 h-6 text-gray-400 hover:text-foreground" />
              </button>
              <p className="font-medium">{selectedSetting}</p>
            </header>
            <ScrollArea className="flex flex-col flex-grow w-full overflow-y-auto">
              {renderSelectedPage()}
            </ScrollArea>
          </motion.div>
        ) : (
          <motion.div
            key="recentConversations"
            initial={hasBacked ? { x: "-100%" } : {}}
            animate={{ x: 0 }}
            exit={hasBacked ? { x: "-100%" } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
          >
            <header className="flex items-center justify-between w-full gap-4 px-6 pb-4 mt-[4.5rem] border-b">
              <p className="font-medium">Settings</p>
            </header>
            <ScrollArea className="flex flex-col w-full h-full max-h-[57rem] overflow-y-auto">
              <button onClick={() => setselectedSetting('cloud')} className="flex items-center justify-between w-full h-20 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
                <div className="flex items-center space-x-4">
                  <Cloud />
                  <div className="text-left">
                    <p className="text-base">Cloud</p>
                    <p className="text-sm text-gray-400">Save everything, even your digital junk drawer!</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <div onClick={toggleAirplaneMode} className="flex items-center justify-between w-full h-20 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20 hover:cursor-pointer">
                <div className="flex items-center space-x-4">
                  <PlaneTakeoff />
                  <div className="text-left">
                    <p className="text-base">Airplane mode</p>
                    <p className="text-sm text-gray-400">Fake a flight and dodge distractions!</p>
                  </div>
                </div>
                <Switch 
                  checked={isAirplaneModeOn} 
                  onCheckedChange={(checked) => setIsAirplaneModeOn(checked)} 
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div onClick={toggleStreamerMode} className="flex items-center justify-between w-full h-20 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20 hover:cursor-pointer">
                <div className="flex items-center space-x-4">
                  <Video />
                  <div className="text-left">
                    <p className="text-base">Streamer mode</p>
                    <p className="text-sm text-gray-400">Hides sensitive information</p>
                  </div>
                </div>
                <Switch
                  checked={isStreamerModeOn}
                  onCheckedChange={(checked) => setIsStreamerModeOn(checked)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <button onClick={() => setselectedSetting('general')} className="flex items-center justify-between w-full h-20 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
                <div className="flex items-center space-x-4">
                  <Settings />
                  <div className="text-left">
                    <p className="text-base">General</p>
                    <p className="text-sm text-gray-400">All the basic stuff that actually matters</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button onClick={() => setselectedSetting('notifications')} className="flex items-center justify-between w-full h-20 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
                <div className="flex items-center space-x-4">
                  <BellDot />
                  <div className="text-left">
                    <p className="text-base">Notifications</p>
                    <p className="text-sm text-gray-400">Where chaos begins (or ends)</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button onClick={() => setselectedSetting('sounds')} className="flex items-center justify-between w-full h-20 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
                <div className="flex items-center space-x-4">
                  <AudioLines />
                  <div className="text-left">
                    <p className="text-base">Sounds</p>
                    <p className="text-sm text-gray-400">Change ringtone and alerts</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button onClick={() => setselectedSetting('unlock')} className="flex items-center justify-between w-full h-20 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
                <div className="flex items-center space-x-4">
                  <ScanFace />
                  <div className="text-left">
                    <p className="text-base">Unlock</p>
                    <p className="text-sm text-gray-400">Let your phone judge your face</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button onClick={() => setselectedSetting('display')} className="flex items-center justify-between w-full h-20 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
                <div className="flex items-center space-x-4">
                  <Smartphone />
                  <div className="text-left">
                    <p className="text-base">Display and brightness</p>
                    <p className="text-sm text-gray-400">Adjust until you go blind, or it's perfect</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button onClick={() => setselectedSetting('wallpapers')} className="flex items-center justify-between w-full h-20 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
                <div className="flex items-center space-x-4">
                  <Image />
                  <div className="text-left">
                    <p className="text-base">Wallpapers</p>
                    <p className="text-sm text-gray-400">Find the image that you'll change in 2 days</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
