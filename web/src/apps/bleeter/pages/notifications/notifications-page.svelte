<script>
  import { ScrollArea } from "@/components/ui/scroll-area";
  import * as Avatar from "@/components/ui/avatar";
  import { LOGGED_IN_AS } from "../../stores/bleeter";
  import { SendEvent } from "@/utils/eventsHandlers";
  import { onMount } from "svelte";

  let notifications = [];

  onMount(async () => {
    // fetch 20/30 latest notifications by username, scroll to fetch more
    notifications = await SendEvent(
      "bleeter:fetchNotifications",
      $LOGGED_IN_AS,
    );
  });
</script>

<header class="flex items-center w-full gap-4 px-6 pb-4 mt-16 border-b">
  <p class="font-medium">Notifications</p>
</header>

<ScrollArea class="flex flex-col w-full h-full max-h-[49.5rem] overflow-y-auto">
  {#if notifications}
    {#each notifications as notification}
      <div
        class="flex items-center w-full h-16 gap-4 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20 hover:cursor-pointer"
      >
        <Avatar.Root>
          <Avatar.Image
            src={notification.avatar}
            alt={`@${notification.from}`}
          />
          <Avatar.Fallback>{notification.displayName[0]}</Avatar.Fallback>
        </Avatar.Root>
        <span>{notification.displayName} {notification.type}</span>
      </div>
    {/each}
  {/if}
</ScrollArea>
