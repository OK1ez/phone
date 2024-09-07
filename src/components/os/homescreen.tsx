
export function Homescreen({ onAppClick }) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-16 homescreen">
      <button onClick={() => onAppClick("bleeter")}>Open Bleeter</button>
      <button onClick={() => onAppClick("messages")}>Open Messages</button>
    </div>
  );
}