import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BleetHeader } from "./bleet-header";
import { BleetContent } from "./bleet-content";
import { BleetActions } from "./bleet-actions";

interface BleetProps {
  handle: string;
  avatar: string;
  name: string;
  content: string;
  image?: string | null;
  comments: number;
  retweets: number;
  likes: number;
  time: string;
  verified?: boolean;
  ad?: boolean;
}

interface BleetComponentProps {
  bleet: BleetProps;
  onOpenProfile: (bleet: BleetProps) => void;
  onLike: (id: number, liked: boolean) => void;
}

export function Bleet({ bleet, onOpenProfile, onLike }: BleetComponentProps) {
  const handleLike = (liked: boolean) => onLike(bleet.id, liked);

  return (
    <div className="flex w-full gap-4 p-4 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20 hover:cursor-pointer">
      <Avatar>
        <AvatarImage src={bleet.avatar} />
        <AvatarFallback>{bleet.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col w-full">
        <BleetHeader bleet={bleet} onOpenProfile={onOpenProfile} />
        <BleetContent content={bleet.content} image={bleet.image} />
        <BleetActions bleet={bleet} onLike={handleLike} />
      </div>
    </div>
  );
}
