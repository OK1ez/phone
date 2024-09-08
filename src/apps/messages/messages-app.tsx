import { RecentConversations } from "./components/recent-convarsations";


export function MessagesApp() {
  return (
    <div className="flex flex-col w-full h-full bg-background">
      <RecentConversations />
    </div>
  );
  }