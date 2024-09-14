import { ChevronRight, Settings2 } from "lucide-react";

export default function SettingsCloudPage() {
  return(
    <>
      <button className="flex items-center justify-between w-full h-20 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
        <div className="flex items-center space-x-4">
          <Settings2 />
          <div className="text-left">
            <p className="text-base">General</p>
            <p className="text-sm text-gray-400">All the basic stuff that actually matters</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>
    </>
  )
}