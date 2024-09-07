export function Lockscreen({ onUnlock }: { onUnlock: () => void }) {
  return (
    <div className="flex items-center justify-center mt-24 lockscreen">
      <p className="text-lg font-medium">21:10</p>
      <button onClick={onUnlock}>Unlock</button>
    </div>
  );
}
