import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bleet } from "../../components/bleet";
import { Plus } from "lucide-react";


const mockBleets = [
  {
    id: 1,
    name: "OK1ez",
    handle: "@okiez",
    avatar: "https://github.com/ok1ez.png",
    verified: false,
    time: "15h",
    content: "This phone is super cool!",
    image: "https://vrabvskoggqqgecvzdql.supabase.co/storage/v1/object/public/assets/test/image.png",
    comments: 5,
    retweets: 205,
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
    likes: 110,
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
    comments: 253,
    retweets: 12,
    likes: 0,
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
    views: 242,
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
        <button className="absolute bottom-0 right-0 flex items-center justify-center m-4 rounded-full shadow-md w-14 h-14 mb-28 bg-secondary hover:bg-accent group">
          <Plus className="text-gray-400 group-hover:text-foreground" />
        </button>
      </TabsContent>
      <TabsContent value="following" className="p-6">
        this dont work
      </TabsContent>
    </Tabs>
  )
}