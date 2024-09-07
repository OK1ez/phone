
export function Indicator() {
  return(
    <button className="absolute bottom-0 flex items-center justify-center w-full h-8 transition-all group">
      <div className="bg-os-indicator w-60 rounded-full min-h-1.5 group-hover:bg-os-indicator/70" />
    </button>
  )
}