import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, Search } from "lucide-react";
import { useState } from "react";

function ContactButton({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-between w-full px-6 border-b h-14 hover:bg-secondary/70 dark:hover:bg-secondary/20 hover:cursor-pointer">
      <p className="text-base">{name}</p>
    </div>
  );
}

const mockData = [
  { name: 'Mads' },
  { name: 'Alex' },
  { name: 'Jordan'},
  { name: 'Taylor' },
  { name: 'Morgan' },
  { name: 'Casey' },
  { name: 'Jamie' },
  { name: 'Riley' },
  { name: 'Cameron' },
];

export function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const sortedContacts = [...mockData]
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter(contact => contact.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return(
    <>
      <header className="flex items-center justify-between w-full gap-4 px-6 pb-4 mt-[4.5rem] border-b">
        <div className="flex items-center w-full h-12 gap-2 px-4 text-lg font-medium transition-all rounded-full bg-secondary dark:bg-secondary/30">
          <Search className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search contacts" 
            className="w-full font-normal bg-transparent min-w-14 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center h-12 font-bold rounded-full font-base min-w-12 bg-secondary dark:bg-secondary/30 group">
          <PlusCircle className="w-5 h-5 text-gray-400 group-hover:text-foreground" />
        </button>
      </header>
      <ScrollArea className="flex-grow w-full overflow-y-auto">
        {sortedContacts.map((call, index) => (
          <ContactButton key={index} name={call.name} />
        ))}
      </ScrollArea>
    </>
  )
}