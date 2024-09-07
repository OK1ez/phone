import { useState, useRef } from "react";
import { BleeterApp } from "@/apps/bleeter/bleeter-app";
import { MessagesApp } from "@/apps/messages/messages-app";
import PhoneWrapper from "./phone-wrapper";
import { Homescreen } from "./homescreen";
import { Lockscreen } from "./lockscreen";
import { motion } from "framer-motion";
import { Indicator } from "./indicator";

type AppComponent = JSX.Element;

interface App {
  id: string;
  label: string;
  component: AppComponent;
}

const apps: App[] = [
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

interface Position {
  x: number;
  y: number;
}

const AppView: React.FC<{
  app: AppComponent;
  appPosition: Position;
  isScaling: boolean;
  isClosing: boolean;
  appRef: React.RefObject<HTMLDivElement>;
  onIndicatorClick?: () => void;
  showIndicator?: boolean;
}> = ({ app, appPosition, isScaling, isClosing, appRef, onIndicatorClick, showIndicator }) => (
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
    {app}
    {showIndicator && <Indicator onIndicatorClick={onIndicatorClick} />}
  </motion.div>
);

export default function Phone() {
  const [isLocked, setIsLocked] = useState(true);
  const [openApp, setOpenApp] = useState<AppComponent | null>(null);
  const [appPosition, setAppPosition] = useState<Position>({ x: 0, y: 0 });
  const [isScaling, setIsScaling] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

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
      setIsScaling(false);
      setOpenApp(null);
    }, 250);
  };

  const handleIndicatorClick = () => {
    if (isLocked) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        unlockPhone();
      }, 300);      
    } else if (openApp) {
      goToHomescreen();
    }
  };

  const showIndicator = isLocked || openApp !== null;

  return (
    <PhoneWrapper lockPhone={lockPhone}>
      {isLocked ? (
        <Lockscreen 
          showIndicator={showIndicator} 
          onIndicatorClick={handleIndicatorClick} 
          isAnimating={isAnimating} 
        />
      ) : (
        <div className="relative z-20 w-full h-full">
          <Homescreen
            onAppClick={(appId: string, event: React.MouseEvent) =>
              openAppById(appId, event)
            }
          />
          {openApp && (
            <AppView
              app={openApp}
              appPosition={appPosition}
              isScaling={isScaling}
              isClosing={isClosing}
              appRef={appRef}
              showIndicator={showIndicator}
              onIndicatorClick={handleIndicatorClick}
            />
          )}
        </div>
      )}
    </PhoneWrapper>
  );
}
