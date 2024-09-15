import { ChevronLeft, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
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
    image: "https://vrabvskoggqqgecvzdql.supabase.co/storage/v1/object/public/assets/test/image.png",
    comments: 5,
    retweets: 205,
    likes: 40,
    views: 223,
    ad: false,
  },
];

interface BleeterProfilePageProps {
  isOwnProfile: boolean;
  hasBackButton?: boolean;
  onBack?: () => void;
}

export function BleeterProfilePage({ isOwnProfile, hasBackButton = false, onBack }: BleeterProfilePageProps) {
  const bleets = mockBleets;

  return (
    <>
      <header className="flex flex-col w-full pb-4 border-b">
        <div className="flex items-center w-full h-5 gap-4 px-6 mt-16">
          {hasBackButton && (
            <button onClick={onBack}>
              <ChevronLeft className="w-6 h-6 text-gray-400 hover:text-foreground" />
            </button>
          )}
          <p className="font-medium">Profile</p>
        </div>
      </header>

      <ScrollArea className="flex flex-col w-full h-full max-h-[49.5rem] overflow-y-auto">
        <div className="relative">
          <img
            src="https://sumeetdas.me/Bleeter/img/banners/bleeter_banner.jpg"
            alt="Profile banner"
            className="object-cover w-full h-32"
          />
          <div className="absolute flex items-end justify-between w-full px-6 -mt-6">
            <Avatar className="w-20 h-20 border-4 border-background">
              <AvatarImage src="https://github.com/ok1ez.png" alt="@okiez" />
              <AvatarFallback>O</AvatarFallback>
            </Avatar>
            {isOwnProfile ? (
              <Button variant="outline" className="rounded-full">
                <Edit2 className="w-4 h-4 mr-2" />
                Edit profile
              </Button>
            ) : (
              <Button className="px-6 rounded-full">Follow</Button>
            )}
          </div>
        </div>
        <div className="p-6 pt-0 mt-16 border-b">
          <h1 className="text-xl font-bold">OKiez</h1>
          <p className="text-gray-400">@okiez</p>
          <p className="mt-2">Test bio</p>
          <div className="flex gap-4 mt-2">
            <button>
              <span className="font-bold">1,234</span>{" "}
              <span className="text-gray-400 ">Following</span>
            </button>
            <button>
              <span className="font-bold">5,678</span>{" "}
              <span className="text-gray-400">Followers</span>
            </button>
          </div>
        </div>
        {bleets.map((bleet) => (
          <Bleet key={bleet.id} bleet={bleet} onOpenProfile={() => {}} />
        ))}
      </ScrollArea>
    </>
  );
}
