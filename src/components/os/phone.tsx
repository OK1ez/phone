import { useState } from "react";
import { BleeterApp } from "@/apps/bleeter/bleeter-app";
import { MessagesApp } from "@/apps/messages/messages-app";
import PhoneWrapper from "./phone-wrapper";
import { Homescreen } from "./homescreen";
import { Lockscreen } from "./lockscreen";

type AppComponent = JSX.Element;

const apps = [
  {
    id: "bleeter",
    label: "Bleeter",
    component: <BleeterApp />,
  },
  {
    id: "messages",
    label: "Messages",
    component: <MessagesApp />,
  },
];

export default function Phone() {
  const [isLocked, setIsLocked] = useState(true);
  const [openApp, setOpenApp] = useState<AppComponent | null>(null);

  const unlockPhone = () => setIsLocked(false);
  const lockPhone = () => setIsLocked(true);
  const openAppById = (appId: string) => {
    const app = apps.find(app => app.id === appId);
    if (app) {
      setOpenApp(app.component);
    }
  };
  const goToHomescreen = () => setOpenApp(null);

  const handleIndicatorClick = () => {
    if (isLocked) {
      unlockPhone();
    } else if (openApp) {
      goToHomescreen();
    }
  };

  const showIndicator = isLocked || openApp !== null;

  return (
    <PhoneWrapper 
      lockPhone={lockPhone}
      showIndicator={showIndicator} 
      onIndicatorClick={handleIndicatorClick}
    >
      {isLocked ? (
        <Lockscreen onUnlock={unlockPhone} />
      ) : (
        <div className="relative z-20 w-full h-full">
          {!openApp ? (
            <Homescreen onAppClick={openAppById} />
          ) : (
            <>{openApp}</>
          )}
        </div>
      )}
    </PhoneWrapper>
  );
}
