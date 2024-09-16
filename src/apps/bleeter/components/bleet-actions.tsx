import { cn } from "@/utils/misc";
import { Heart, MessageSquare, Repeat2 } from "lucide-react";
import { useState } from "react";

interface BleetActionsProps {
  bleet: {
    comments: number;
    retweets: number;
    likes: number;
  };
  onLike: (liked: boolean) => void;
}

export function BleetActions({ bleet, onLike }: BleetActionsProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    onLike(!isLiked);
  };

  return (
    <div className="flex gap-8 mt-4">
      <button className="flex items-center w-16 text-gray-400 hover:text-blue-400">
        <MessageSquare size={20} />
        {bleet.comments > 0 && (
          <span className="ml-2">{bleet.comments}</span>
        )}
      </button>
      <button className="flex items-center w-16 text-gray-400 hover:text-emerald-500">
        <Repeat2 size={20} />
        {bleet.retweets > 0 && (
          <span className="ml-2">{bleet.retweets}</span>
        )}
      </button>
      <button 
        className={cn("flex items-center w-16 hover:text-rose-600", isLiked ? "text-rose-600" : "text-gray-400")}
        onClick={handleLikeClick}
      >
        <Heart size={20} className={isLiked ? " fill-rose-600" : ""} />
        {bleet.likes > 0 && (
          <span className="ml-2">{bleet.likes}</span>
        )}
      </button>
    </div>
  );
}
