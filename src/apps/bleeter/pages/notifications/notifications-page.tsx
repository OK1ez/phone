import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockNotifications = [
  { id: 1, username: "OKiez", avatarSrc: "https://github.com/ok1ez.png", message: "started following you" },
  { id: 2, username: "Mads", avatarSrc: "https://github.com/madsleander.png", message: "liked your post" },
  { id: 3, username: "John", avatarSrc: "https://github.com/john.png", message: "commented on your photo" },
  { id: 4, username: "Alice", avatarSrc: "https://github.com/alice.png", message: "shared your post" },
  { id: 5, username: "Bob", avatarSrc: "https://github.com/bob.png", message: "started following you" },
  { id: 6, username: "Eve", avatarSrc: "https://github.com/eve.png", message: "liked your comment" },
  { id: 7, username: "Charlie", avatarSrc: "https://github.com/charlie.png", message: "commented on your photo" },
  { id: 8, username: "Diana", avatarSrc: "https://github.com/diana.png", message: "mentioned you in a post" },
  { id: 9, username: "Frank", avatarSrc: "https://github.com/frank.png", message: "started following you" },
  { id: 10, username: "Grace", avatarSrc: "https://github.com/grace.png", message: "liked your post" },
];

function Notification({ username, avatarSrc, message }: { username: string; avatarSrc: string; message: string }) {
  return (
    <div className="flex items-center w-full h-16 gap-4 px-6 border-b">
      <Avatar>
        <AvatarImage src={avatarSrc} />
        <AvatarFallback>{username[0]}</AvatarFallback>
      </Avatar>
      <span>{username} {message}</span>
    </div>
  );
}

export function BleeterNotificationsPage() {
  return (
    <>
      <header className="flex flex-col w-full pb-4 border-b">
        <div className="flex items-center justify-between w-full h-5 gap-4 px-6 mt-16">
          <p className="font-medium">Notifications</p>
        </div>
      </header>

      <ScrollArea className="flex flex-col w-full h-full max-h-[49.5rem] overflow-y-auto">
        {mockNotifications.map(notification => (
          <Notification
            key={notification.id}
            username={notification.username}
            avatarSrc={notification.avatarSrc}
            message={notification.message}
          />
        ))}
      </ScrollArea>
    </>
  );
}
