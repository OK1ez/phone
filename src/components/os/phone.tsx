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
  const [appPosition, setAppPosition] = useState({ x: 0, y: 0 }); // Store click coordinates
  const [isScaling, setIsScaling] = useState(false); // State for controlling the animation
  const [isClosing, setIsClosing] = useState(false); // State to track if app is closing

  const appRef = useRef<HTMLDivElement>(null); // Ref to track app's DOM element

  const unlockPhone = () => setIsLocked(false);
  const lockPhone = () => setIsLocked(true);

  // Handle app opening and capture click coordinates
  const openAppById = (appId: string, event: React.MouseEvent) => {
    const app = apps.find((app) => app.id === appId);
    if (app) {
      const { clientX, clientY } = event;
      setAppPosition({ x: clientX, y: clientY }); // Capture click coordinates
      setOpenApp(app.component);
      setIsScaling(true); // Start the scaling animation
      setIsClosing(false); // App is opening
    }
  };

  const goToHomescreen = () => {
    // App is closing
    setIsClosing(true);

    // Delay to let the animation play before removing the app
    setTimeout(() => {
      setOpenApp(null);
      setIsScaling(false); // Reset scaling state
    }, 250); // Set timeout equal to animation duration
  };

  const handleIndicatorClick = () => {
    if (isLocked) {
      unlockPhone();
    } else if (openApp) {
      goToHomescreen(); // Close app when indicator is clicked
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
                scale: isClosing ? 1 : 0.0,
                x: isClosing ? 0 : appPosition.x - window.innerWidth / 2,
                y: isClosing ? 0 : appPosition.y - window.innerHeight / 2,
              }}
              animate={{
                scale: isClosing ? 0 : 1,
                x: isClosing ? appPosition.x - window.innerWidth / 2 : 0,
                y: isClosing ? appPosition.y - window.innerHeight / 2 : 0,
              }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
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
