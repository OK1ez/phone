import { ChevronRight } from "lucide-react";

export default function SettingsUnlockPage() {
  return(
    <div>
      <>
        <button className="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
          <div className="flex items-center text-left">
            <p className="text-base">Face unlock</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
        <button className="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
          <div className="flex items-center text-left">
            <p className="text-base">Turn on passcode</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
        <button className="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
          <div className="flex items-center text-left">
            <p className="text-base">Change passcode</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </>
    </div>
  )
}