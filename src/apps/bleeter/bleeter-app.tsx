import { useState } from 'react';
import { BleeterNav } from "./components/nav";
import { BleeterHomePage } from "./pages/home/home-page";
import { BleeterSearchPage } from "./pages/search/search-page";
import { BleeterNotificationsPage } from './pages/notifications/notifications-page';
import { BleeterProfilePage } from './pages/profile/profile-page';
import { Plus } from 'lucide-react';

export function BleeterApp() {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <BleeterHomePage />;
      case 'search':
        return <BleeterSearchPage />;
      case 'notifications':
        return <BleeterNotificationsPage />;
      case 'profile':
        return <BleeterProfilePage isOwnProfile={true} hasBackButton={false} />;
      default:
        return <BleeterHomePage />;
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-background">
      {renderPage()}
      <button className="absolute bottom-0 right-0 flex items-center justify-center m-4 rounded-full shadow-md w-14 h-14 mb-28 bg-secondary hover:bg-muted group">
        <Plus className="text-gray-400 group-hover:text-foreground" />
      </button>
      <BleeterNav activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
}
