import { BellDot, Home, Search, User } from "lucide-react";

export function BleeterNav() {
  return(
    <nav className="absolute bottom-0 flex justify-between w-full h-24 px-16 pb-6 border-t bg-background ">
      <button>
        <Home size={25} className="fill-foreground" />
      </button>
      <button>
        <Search size={25} />
      </button>
      <button>
        <BellDot size={25} />
      </button>
      <button>
        <User size={25} />
      </button>
    </nav>
  )
}