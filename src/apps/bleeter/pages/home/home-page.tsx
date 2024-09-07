import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bleet } from "../../components/bleet";


const mockBleets = [
  {
    id: 1,
    name: "OK1ez",
    handle: "@okiez",
    avatar: "https://github.com/ok1ez.png",
    verified: false,
    time: "15h",
    content: "This phone is super cool!",
    image: "https://cdn.discordapp.com/attachments/1099654888889266228/1165071137269616640/image.png?ex=66dce38d&is=66db920d&hm=e733dd56b0e844e81774778056bb3a00bf14021d6b56b03fb4d4fac0056c8b8d&",
    comments: 5,
    retweets: 12,
    likes: 40,
    views: 223,
    ad: false
  },
  {
    id: 2,
    name: "Mads",
    handle: "@mads",
    avatar: "https://github.com/madsleander.png",
    verified: true,
    time: "15h",
    content: "This phone is super cool!",
    image: null,
    comments: 5,
    retweets: 12,
    likes: 40,
    views: 124,
    ad: false
  },
  {
    id: 3,
    name: "Mads",
    handle: "@mads",
    avatar: "https://github.com/madsleander.png",
    verified: true,
    time: "15h",
    content: "This phone is super cool!",
    image: null,
    comments: 5,
    retweets: 12,
    likes: 40,
    views: 10,
    ad: false
  },
  {
    id: 4,
    name: "Mads",
    handle: "@mads",
    avatar: "https://github.com/madsleander.png",
    verified: true,
    time: "15h",
    content: "This phone is super cool!",
    image: null,
    comments: 5,
    retweets: 12,
    likes: 40,
    views: 24042,
    ad: false
  },
  {
    id: 5,
    name: "Mads",
    handle: "@mads",
    avatar: "https://github.com/madsleander.png",
    verified: true,
    time: "15h",
    content: "This phone is super cool!",
    image: null,
    comments: 5,
    retweets: 12,
    likes: 40,
    views: 232,
    ad: false
  },
];

export function BleeterHomePage() {
  const bleets = mockBleets;

  return(
    <Tabs defaultValue="for-you">
      <TabsList className="w-full mt-16 bg-transparent border-b rounded-none space-x-36">
        <TabsTrigger value="for-you" className="border-b-2 border-transparent rounded-none data-[state=active]:border-foreground py-2 text-base mb-1">
          For you
        </TabsTrigger>
        <TabsTrigger value="following" className="border-b-2 border-transparent rounded-none data-[state=active]:border-foreground py-2 text-base mb-1">
          Following
        </TabsTrigger>
      </TabsList>
      <TabsContent value="for-you" className="py-0 my-0 ">
        <ScrollArea className="flex flex-col w-full h-full max-h-[49.5rem] overflow-y-auto">
          {bleets.map((bleet) => (
            <Bleet key={bleet.id} bleet={bleet} />
          ))}
        </ScrollArea>
      </TabsContent>
      <TabsContent value="following">
        
      </TabsContent>
    </Tabs>
  )
}