import { useState, useEffect } from 'react';
import { BleeterNav } from "./components/nav";
import { BleeterHomePage } from "./pages/home/home-page";
import { BleeterSearchPage } from "./pages/search/search-page";
import { BleeterNotificationsPage } from './pages/notifications/notifications-page';
import { BleeterProfilePage } from './pages/profile/profile-page';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { useBleeterUser } from '@/states/bleeter/user';

interface BleetProps {
  handle: string;
  avatar: string;
  name: string;
  content: string;
  image?: string | null;
  comments: number;
  retweets: number;
  likes: number;
  time: string;
}

export function BleeterApp() {
  const [activePage, setActivePage] = useState('home');
  const [currentProfile, setCurrentProfile] = useState<BleetProps | null>(null);
  const user = useBleeterUser();

  const openProfile = (bleet: BleetProps) => {
    setCurrentProfile(bleet);
  };

  const goBackToBleets = () => {
    setCurrentProfile(null);
  };

  useEffect(() => {
    setCurrentProfile(null);
  }, [activePage]);

  const activePageVariants = {
    hidden: { x: "-100%" },
    exit: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 35 },
    },
    enter: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 35 },
    },
  };

  const profilePageVariants = {
    hidden: { x: "100%" },
    enter: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 35 },
    },
    exit: {
      x: "100%",
      transition: { type: "spring", stiffness: 300, damping: 35 },
    },
  };

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'home':
        return <BleeterHomePage onOpenProfile={openProfile} />;
      case 'search':
        return <BleeterSearchPage />;
      case 'notifications':
        return <BleeterNotificationsPage />;
      case 'profile':
        return <BleeterProfilePage isOwnProfile={true} hasBackButton={false} user={user} />;
      default:
        return <BleeterHomePage onOpenProfile={openProfile} />;
    }
  };

  return (
    <div className="relative flex flex-col w-full h-full bg-background">
      <AnimatePresence initial={false}>
        {currentProfile ? (
          <motion.div
            key="profile-page"
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={profilePageVariants}
            className="absolute top-0 left-0 w-full h-full bg-background"
          >
            <BleeterProfilePage
              isOwnProfile={false}
              hasBackButton={true}
              onBack={goBackToBleets}
            />
          </motion.div>
        ) : (
          <motion.div
            key="current-page"
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={activePageVariants}
            className="absolute top-0 left-0 w-full h-full bg-background"
          >
            {renderCurrentPage()}
          </motion.div>
        )}
      </AnimatePresence>

      <button className="absolute bottom-0 right-0 flex items-center justify-center m-4 rounded-full shadow-md w-14 h-14 mb-28 bg-secondary hover:bg-muted group">
        <Plus className="text-gray-400 group-hover:text-foreground" />
      </button>

      <BleeterNav activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
}
