import { Heart, MessageSquare, Repeat2, ChartNoAxesColumn } from "lucide-react";

export function BleetActions({ bleet }) {
  return (
    <div className="flex gap-8 mt-4">
      <button className="flex items-center text-gray-400 hover:text-blue-400">
        <MessageSquare size={20} />
        <span className="ml-2">{bleet.comments}</span>
      </button>
      <button className="flex items-center text-gray-400 hover:text-emerald-500">
        <Repeat2 size={20} />
        <span className="ml-2">{bleet.retweets}</span>
      </button>
      <button className="flex items-center text-gray-400 hover:text-rose-600">
        <Heart size={20} />
        <span className="ml-2">{bleet.likes}</span>
      </button>
      <button className="flex items-center text-gray-400 hover:text-blue-400">
        <ChartNoAxesColumn size={20} />
        <span className="ml-2">{bleet.views}</span>
      </button>
    </div>
  );
}
