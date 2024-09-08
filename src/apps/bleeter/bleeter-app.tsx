import { useState } from 'react';
import { BleeterNav } from "./components/nav";
import { BleeterHomePage } from "./pages/home/home-page";
import { BleeterSearchPage } from "./pages/search/search-page";
import { BleeterNotificationsPage } from './pages/notifications/notifications-page';
import { BleeterProfilePage } from './pages/profile/profile-page';

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
        return <BleeterProfilePage />;
      default:
        return <BleeterHomePage />;
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-background">
      {renderPage()}
      <BleeterNav activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
}
