import { ChevronRight } from "lucide-react";

export default function SettingsGeneralPage() {
  return(
    <>
      <button className="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
        <div className="flex items-center text-left">
          <p className="text-base">About</p>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>
      <button className="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
        <div className="flex items-center text-left">
          <p className="text-base">Software updates</p>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>
      <button className="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
        <div className="flex items-center text-left">
          <p className="text-base">Air transfer</p>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>
      <button className="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
        <div className="flex items-center text-left">
          <p className="text-base">Reset phone</p>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>
    </>
  )
}