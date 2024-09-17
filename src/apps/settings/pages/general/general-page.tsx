import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";

import About from "./general-about-page";
import SoftwareUpdates from "./general-updates-page";
import ResetPhone from "./general-reset-page";

interface SettingsGeneralPageProps {
  onBack: () => void;
}

export default function SettingsGeneralPage({ onBack }: SettingsGeneralPageProps) {
  const [selectedSetting, setSelectedSetting] = useState<string | null>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isAirShareModeOn, setIsAirShareModeOn] = useState(false);

  const toggleAirShareMode = () => setIsAirShareModeOn(prev => !prev);

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
    }
  }, [isFirstLoad]);

  const renderSettingComponent = () => {
    switch (selectedSetting) {
      case "about":
        return <About />;
      case "updates":
        return <SoftwareUpdates />;
      case "reset":
        return <ResetPhone />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {!selectedSetting ? (
        <motion.div
          key="general"
          initial={{ x: isFirstLoad ? "0%" : "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: isFirstLoad ? "0%" : "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 35 }}
          className="absolute top-0 left-0 w-full h-full overflow-hidden"
        >
          <header className="flex items-center w-full gap-4 px-6 pb-4 mt-[4.5rem] border-b">
            <button onClick={onBack} className="text-gray-400 hover:text-foreground" aria-label="Return to settings">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <p className="font-medium">General</p>
          </header>
          <ScrollArea className="flex flex-col flex-grow w-full overflow-y-auto">
            <button
              onClick={() => setSelectedSetting("about")}
              className="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20"
            >
              <div className="flex items-center text-left">
                <p className="text-base">About</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={() => setSelectedSetting("updates")}
              className="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20"
            >
              <div className="flex items-center text-left">
                <p className="text-base">Software Updates</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <div onClick={toggleAirShareMode} className="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20 hover:cursor-pointer">
              <div className="flex items-center text-left">
                <p className="text-base">Air transfer</p>
              </div>
              <Switch
                  checked={isAirShareModeOn}
                  onCheckedChange={(checked) => setIsAirShareModeOn(checked)}
                  onClick={(e) => e.stopPropagation()}
                />
            </div>
            <button
              onClick={() => setSelectedSetting("reset")}
              className="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20"
            >
              <div className="flex items-center text-left">
                <p className="text-base">Reset Phone</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </ScrollArea>
        </motion.div>
      ) : (
        <motion.div
          key="detail"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 35 }}
          className="absolute top-0 left-0 w-full h-full overflow-hidden"
        >
          <header className="flex items-center w-full gap-4 px-6 pb-4 mt-[4.5rem] border-b">
            <button onClick={() => setSelectedSetting(null)} className="text-gray-400 hover:text-foreground">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <p className="font-medium">{selectedSetting}</p>
          </header>
          {renderSettingComponent()}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
