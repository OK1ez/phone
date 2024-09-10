import React from 'react';

interface HomescreenProps {
  onAppClick: (appId: string, event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Homescreen({ onAppClick }: HomescreenProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-16 homescreen">
      <button onClick={(e) => onAppClick("bleeter", e)}>Open Bleeter</button>
      <button onClick={(e) => onAppClick("messages", e)}>Open Messages</button>
    </div>
  );
}
