import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface SettingsNotificationsPageProps {
  onBack: () => void;
}

interface NotificationSetting {
  name: string;
  status: string;
}

const mockData: NotificationSetting[] = [
  { name: "Bleeter", status: "Off" },
  { name: "Messages", status: "Off" },
  { name: "Phone", status: "Off" },
];

export default function SettingsNotificationsPage({ onBack }: SettingsNotificationsPageProps) {
  const [selectedSetting, setSelectedSetting] = useState<NotificationSetting | null>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
    }
  }, [isFirstLoad]);

  return(
    <AnimatePresence>
      {!selectedSetting ? (
        <motion.div
          key="notifications"
          initial={{ x: isFirstLoad ? "0%" : "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: isFirstLoad ? "0%" : "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 35 }}
          className="absolute top-0 left-0 w-full h-full overflow-hidden"
        >
          <header className="flex items-center w-full gap-4 px-6 pb-4 mt-[4.5rem] border-b">
            <button onClick={onBack} className="text-gray-400 hover:text-foreground">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <p className="font-medium">Notifications</p>
          </header>
          <ScrollArea className="flex flex-col flex-grow w-full overflow-y-auto">
            {mockData.map((setting, index) => (
              <button
                key={index}
                className="flex items-center justify-between w-full h-20 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20"
                onClick={() => setSelectedSetting(setting)}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-left">
                    <p className="text-base">{setting.name}</p>
                    <p className="text-sm text-gray-400">{setting.status}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            ))}
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
            <p className="font-medium">{selectedSetting.name}</p>
          </header>
          <div className="flex flex-col">
            <div className="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20 hover:cursor-pointer">
              <p className="text-base">Allow notifications</p>
              <Switch />
            </div>
            <div className="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20 hover:cursor-pointer">
              <p className="text-base">Sounds</p>
              <Switch />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
