import { Clock, Contact, Grip, Star } from "lucide-react";
import React from "react";

interface PhoneNavProps {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
  activePage: string;
}

export function PhoneNav({ setActivePage, activePage }: PhoneNavProps) {
  return (
    <nav className="absolute bottom-0 flex items-center justify-between w-full h-24 px-16 pb-6 border-t bg-background">
      <button
        onClick={() => setActivePage('favorites')}
      >
        <Star size={25} className={activePage === 'favorites' ? '' : ' text-gray-400'} />
      </button>
      <button
        onClick={() => setActivePage('recentCalls')}
      >
        <Clock size={25} className={activePage === 'recentCalls' ? '' : 'text-gray-400'} />
      </button>
      <button
        onClick={() => setActivePage('contacts')}
      >
        <Contact size={25} className={activePage === 'contacts' ? '' : 'text-gray-400'} />
      </button>
      <button
        onClick={() => setActivePage('keypad')}
      >
        <Grip size={25} className={activePage === 'keypad' ? '' : 'text-gray-400'} />
      </button>
    </nav>
  );
}
