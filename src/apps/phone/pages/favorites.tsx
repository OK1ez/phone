import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AvatarImage } from "@radix-ui/react-avatar";
import { InfoIcon } from "lucide-react";

function FavoriteButton({ name, image }: { name: string, image: string }) {
  return (
    <div className="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20 hover:cursor-pointer">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarFallback>{name[0]}</AvatarFallback>
          <AvatarImage src={image} />
        </Avatar>
        <p className="text-base">{name}</p>
      </div>
      <button>
        <InfoIcon className="w-4 h-4 text-gray-400 hover:text-foreground" />
      </button>
    </div>
  );
}

const mockData = [
  { name: 'Mads', image: "https://github.com/madsleander.png" },
  { name: 'Alex', image: "https://github.com/ok1ez.png" },
  { name: 'Jordan', image: "https://github.com/john.png" },
  { name: 'Taylor', image: "https://github.com/alice.png" },
  { name: 'Morgan', image: "https://github.com/bob.png" },
  { name: 'Casey', image: "https://github.com/eve.png" },
  { name: 'Jamie', image: "https://github.com/charlie.png" },
  { name: 'Riley', image: "https://github.com/diana.png" },
  { name: 'Cameron', image: "https://github.com/frank.png" },
];

export function FavoritesPage() {
  return (
    <>
      <header className="flex flex-col w-full pb-4 border-b">
        <div className="flex items-center justify-between w-full h-5 gap-4 px-6 mt-16">
          <p className="font-medium">Favorites</p>
        </div>
      </header>
      <ScrollArea className="flex-grow w-full overflow-y-auto">
        {mockData.map((call, index) => (
          <FavoriteButton key={index} name={call.name} image={call.image} />
        ))}
      </ScrollArea>
    </>
  );
}