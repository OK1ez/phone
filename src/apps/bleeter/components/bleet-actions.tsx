import { Heart, MessageSquare, Repeat2 } from "lucide-react";

interface Bleet {
  comments: number;
  retweets: number;
  likes: number;
}

interface BleetActionsProps {
  bleet: Bleet;
}

export function BleetActions({ bleet }: BleetActionsProps) {
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
      <button className="flex items-center w-16 text-gray-400 hover:text-rose-600">
        <Heart size={20} />
        {bleet.likes > 0 && (
          <span className="ml-2">{bleet.likes}</span>
        )}
      </button>
    </div>
  );
}
