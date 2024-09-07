interface IndicatorProps {
  onIndicatorClick?: () => void;
}

export function Indicator({ onIndicatorClick }: IndicatorProps) {
  return (
    <button
      className="absolute bottom-0 z-50 flex items-center justify-center w-full h-8 transition-all group"
      onClick={onIndicatorClick}
    >
      <div className="bg-os-indicator w-60 rounded-full min-h-1.5 group-hover:bg-os-indicator/70" />
    </button>
  );
}
