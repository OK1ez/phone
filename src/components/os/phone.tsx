import { useState, useRef } from "react";
import { BleeterApp } from "@/apps/bleeter/bleeter-app";
import { MessagesApp } from "@/apps/messages/messages-app";
import PhoneWrapper from "./phone-wrapper";
import { Homescreen } from "./homescreen";
import { Lockscreen } from "./lockscreen";
import { motion } from "framer-motion";

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
  const [appPosition, setAppPosition] = useState({ x: 0, y: 0 });
  const [isScaling, setIsScaling] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const appRef = useRef<HTMLDivElement>(null); 

  const unlockPhone = () => setIsLocked(false);
  const lockPhone = () => setIsLocked(true);

  const openAppById = (appId: string, event: React.MouseEvent) => {
    const app = apps.find((app) => app.id === appId);
    if (app) {
      const { clientX, clientY } = event;
      setAppPosition({ x: clientX, y: clientY });
      setOpenApp(app.component);
      setIsScaling(true);
      setIsClosing(false);
    }
  };

  const goToHomescreen = () => {
    setIsClosing(true);

    setTimeout(() => {
      setOpenApp(null);
      setIsScaling(false);
    }, 250);
  };

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
        <Lockscreen />
      ) : (
        <div className="relative z-20 w-full h-full">
          <Homescreen
            onAppClick={(appId: string, event: React.MouseEvent) =>
              openAppById(appId, event)
            }
          />
          {openApp && (
            <motion.div
              ref={appRef}
              initial={{
                scale: isScaling ? 0.0 : 1,
                x: isScaling ? appPosition.x - window.innerWidth / 2 : 0,
                y: isScaling ? appPosition.y - window.innerHeight / 2 : 0,
              }}
              animate={{
                scale: isClosing ? 0 : 1,
                x: isClosing ? appPosition.x - window.innerWidth / 2 : 0,
                y: isClosing ? appPosition.y - window.innerHeight / 2 : 0,
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {openApp}
            </motion.div>
          )}
        </div>
      )}
    </PhoneWrapper>
  );
}
