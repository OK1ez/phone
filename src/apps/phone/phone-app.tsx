import { useState } from "react";
import { PhoneNav } from "./components/nav";
import { RecentCallsPage } from "./pages/recent-calls";
import { ContactsPage } from "./pages/contacts";
import { FavoritesPage } from "./pages/favorites";
import { KeyPadPage } from "./pages/keypad";

export function PhoneApp() {
  const [activePage, setActivePage] = useState('recentCalls');

  const renderPage = () => {
    switch (activePage) {
      case 'favorites':
        return <FavoritesPage />;
      case 'recentCalls':
        return <RecentCallsPage />;
      case 'contacts':
        return <ContactsPage />;
      case 'keypad':
        return <KeyPadPage />;
      default:
        return <RecentCallsPage />;
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-background">
      {renderPage()}
      <PhoneNav activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
  }