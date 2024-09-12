import { BellDot, Home, Search, User } from "lucide-react";
import React from "react";

interface BleeterNavProps {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
  activePage: string;
}

export function BleeterNav({ setActivePage, activePage }: BleeterNavProps) {
  return (
    <nav className="absolute bottom-0 flex items-center justify-between w-full h-24 px-16 pb-6 border-t bg-background">
      <button
        onClick={() => setActivePage('home')}
      >
        <Home size={25} className={activePage === 'home' ? '' : 'text-gray-400'} />
      </button>
      <button
        onClick={() => setActivePage('search')}
      >
        <Search size={25} className={activePage === 'search' ? '' : 'text-gray-400'} />
      </button>
      <button
        onClick={() => setActivePage('notifications')}
      >
        <BellDot size={25} className={activePage === 'notifications' ? '' : 'text-gray-400'} />
      </button>
      <button
        onClick={() => setActivePage('profile')}
      >
        <User size={25} className={activePage === 'profile' ? '' : 'text-gray-400'} />
      </button>
    </nav>
  );
}
