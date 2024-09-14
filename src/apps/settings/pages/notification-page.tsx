import { ChevronRight } from "lucide-react";

export default function SettingsNotificationsPage() {
  return(
    <>
      <button className="flex items-center justify-between w-full h-20 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
        <div className="flex items-center space-x-4">
          <div className="text-left">
            <p className="text-base">Bleeter</p>
            <p className="text-sm text-gray-400">Off</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>
      <button className="flex items-center justify-between w-full h-20 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
        <div className="flex items-center space-x-4">
          <div className="text-left">
            <p className="text-base">Messages</p>
            <p className="text-sm text-gray-400">Off</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>
      <button className="flex items-center justify-between w-full h-20 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
        <div className="flex items-center space-x-4">
          <div className="text-left">
            <p className="text-base">Phone</p>
            <p className="text-sm text-gray-400">Off</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>
      <button className="flex items-center justify-between w-full h-20 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
        <div className="flex items-center space-x-4">
          <div className="text-left">
            <p className="text-base">Bleeter</p>
            <p className="text-sm text-gray-400">Off</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>
    </>
  )
}