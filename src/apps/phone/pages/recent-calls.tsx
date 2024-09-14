
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/utils/misc";
import { InfoIcon } from "lucide-react";

function CallButton({ name, date, missed }: { name: string; date: string; missed: boolean }) {
  return (
    <div className="flex items-center justify-between w-full px-6 border-b h-14 hover:bg-secondary/70 dark:hover:bg-secondary/20">
      <p className={cn("text-base", missed ? "text-red-500" : "")}>{name}</p>
      <div className="flex items-center space-x-4">
        <p className="text-sm text-gray-400">{date}</p>
        <div className="cursor-pointer">
          <InfoIcon className="w-4 h-4 text-gray-400 hover:text-foreground" />
        </div>
      </div>
    </div>
  );
}

const mockData = [
  { name: 'Mads', date: 'Yesterday', missed: true },
  { name: 'Alex', date: '2 days ago', missed: false },
  { name: 'Jordan', date: '3 days ago', missed: false },
  { name: 'Taylor', date: '1 week ago', missed: false },
  { name: 'Morgan', date: '2 weeks ago', missed: false },
  { name: 'Casey', date: '3 weeks ago', missed: false },
  { name: 'Jamie', date: '1 month ago', missed: false },
  { name: 'Riley', date: '1 month ago', missed: true },
  { name: 'Cameron', date: '2 months ago', missed: false },
  { name: 'Avery', date: '3 months ago', missed: false },
  { name: 'Sydney', date: '4 months ago', missed: false },
  { name: 'Dakota', date: '5 months ago', missed: false },
  { name: 'Parker', date: '6 months ago', missed: false },
  { name: 'Quinn', date: '7 months ago', missed: false },
  { name: 'Finley', date: '8 months ago', missed: true },
  { name: 'Rowan', date: '9 months ago', missed: false },
  { name: 'Skylar', date: '10 months ago', missed: false },
  { name: 'Jesse', date: '11 months ago', missed: false },
  { name: 'Reese', date: '1 year ago', missed: false },
  { name: 'Blake', date: '1 year ago', missed: false },
  { name: 'Emerson', date: '1 year ago', missed: false },
  { name: 'Addison', date: '1 year ago', missed: false },
  { name: 'Alexis', date: '1 year ago', missed: false },
  { name: 'Drew', date: '1 year ago', missed: false },
  { name: 'Sawyer', date: '1 year ago', missed: false },
  { name: 'Charlie', date: '1 year ago', missed: false },
  { name: 'Harper', date: '1 year ago', missed: false },
  { name: 'Aiden', date: '1 year ago', missed: false },
  { name: 'Peyton', date: '1 year ago', missed: false },
  { name: 'Jordan', date: '1 year ago', missed: false },
  { name: 'Taylor', date: '1 year ago', missed: false },
  { name: 'Mason', date: '1 year ago', missed: false },
  { name: 'Elliott', date: '1 year ago', missed: false },
  { name: 'Sydney', date: '1 year ago', missed: false },
];

export function RecentCallsPage() {
  return (
    <>
      <header className="flex flex-col w-full pb-4 border-b">
        <div className="flex items-center justify-between w-full h-5 gap-4 px-6 mt-16">
          <p className="font-medium">Recent calls</p>
        </div>
      </header>
      <ScrollArea className="flex-grow w-full overflow-y-auto">
        {mockData.map((call, index) => (
          <CallButton key={index} name={call.name} date={call.date} missed={call.missed} />
        ))}
      </ScrollArea>
    </>
  );
}