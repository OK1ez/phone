import { ChevronLeft } from "lucide-react";

export function BleeterProfilePage() {

  return(
    <>
      <header className="flex flex-col w-full pb-4 border-b">
        <div className="flex items-center w-full h-5 gap-4 px-6 mt-16">
          <button>
            <ChevronLeft className="w-6 h-6 text-gray-400 hover:text-foreground" />
          </button>
          <p className="font-medium">Profile</p>
        </div>
      </header>

      <div>
        
      </div>
    </>
  )
}