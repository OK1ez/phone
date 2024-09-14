import { useState, useRef } from "react";
import { BleeterApp } from "@/apps/bleeter/bleeter-app";
import { MessagesApp } from "@/apps/messages/messages-app";
import PhoneWrapper from "./phone-wrapper";
import { Homescreen } from "./homescreen";
import { Lockscreen } from "./lockscreen";
import { motion } from "framer-motion";
import { Indicator } from "./indicator";
import { PhoneApp } from "@/apps/phone/phone-app";
import { SettingsApp } from "@/apps/settings/settings-app";

type AppComponent = JSX.Element;

interface App {
  id: string;
  label: string;
  component: AppComponent;
}

interface Position {
  x: number;
  y: number;
}

interface AppViewProps {
  app: AppComponent;
  appPosition: Position;
  isScaling: boolean;
  isClosing: boolean;
  appRef: React.RefObject<HTMLDivElement>;
  onIndicatorClick?: () => void;
}

const apps: App[] = [
  {
    id: "settings",
    label: "Settings",
    component: <SettingsApp />,
  },
  {
    id: "bleeter",
    label: "Bleeter",
    component: <BleeterApp />,
  },
  {
    id: "phone",
    label: "Phone",
    component: <PhoneApp />,
  },
  {
    id: "messages",
    label: "Messages",
    component: <MessagesApp />,
  },
];

const AppView: React.FC<AppViewProps> = ({ app, appPosition, isScaling, isClosing, appRef, onIndicatorClick }) => {
  const initialScale = isScaling ? 0 : 1;
  const initialX = isScaling ? appPosition.x - window.innerWidth / 2 : 0;
  const initialY = isScaling ? appPosition.y - window.innerHeight / 2 : 0;

  const animateScale = isClosing ? 0 : 1;
  const animateX = isClosing ? appPosition.x - window.innerWidth / 2 : 0;
  const animateY = isClosing ? appPosition.y - window.innerHeight / 2 : 0;

  return (
    <motion.div
      ref={appRef}
      initial={{ scale: initialScale, x: initialX, y: initialY }}
      animate={{ scale: animateScale, x: animateX, y: animateY }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {app}
      <Indicator onIndicatorClick={onIndicatorClick} />
    </motion.div>
  );
};


export default function Phone() {
  const [isLocked, setIsLocked] = useState(true);
  const [openApp, setOpenApp] = useState<AppComponent | null>(null);
  const [appPosition, setAppPosition] = useState<Position>({ x: 0, y: 0 });
  const [isScaling, setIsScaling] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const appRef = useRef<HTMLDivElement>(null);

  const unlockPhone = () => setIsLocked(false);
  const lockPhone = () => setIsLocked(true);

  const openAppById = (appId: string, event: React.MouseEvent<HTMLButtonElement>) => {
    const app = apps.find(app => app.id === appId);
    if (app) {
      setAppPosition({ x: event.clientX, y: event.clientY });
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

  return (
    <PhoneWrapper lockPhone={lockPhone}>
      {isLocked ? (
        <Lockscreen onIndicatorClick={unlockPhone} />
      ) : (
        <div className="relative z-10 w-full h-full" id="portal">
          <Homescreen onAppClick={openAppById} />
          {openApp && (
            <AppView
              app={openApp}
              appPosition={appPosition}
              isScaling={isScaling}
              isClosing={isClosing}
              appRef={appRef}
              onIndicatorClick={goToHomescreen}
            />
          )}
        </div>
      )}
    </PhoneWrapper>
  );
}
