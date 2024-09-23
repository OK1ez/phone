<script>
  import { ChevronLeft, ChevronRight } from "lucide-svelte";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import { goBack, navigateTo, SELECTED_NOTIFICATION_APP } from "../../stores/settings";
  import { APPS } from "@/stores/phone";

  function selectNotificationItem(appKey) {
    SELECTED_NOTIFICATION_APP.set(appKey);
    navigateTo('notificationsOptions');
  }
</script>

<header class="flex items-center w-full gap-4 px-6 pb-4 mt-16 border-b">
  <button on:click={goBack} class="text-gray-400 hover:text-foreground">
    <ChevronLeft className="w-6 h-6" />
  </button>
  <p class="font-medium">Notifications</p>
</header>

<ScrollArea class="flex flex-col w-full h-full max-h-[49.5rem] overflow-y-auto">
  {#each Object.entries($APPS) as [appKey, app]}
    <button on:click={() => selectNotificationItem(appKey)} class="flex items-center justify-between w-full h-20 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
      <div class="text-left">
        <p class="text-base">{app.name}</p>
        <p class="text-sm text-gray-400">Notifications off, Sounds off</p>
      </div>
      <ChevronRight class="w-4 h-4 text-gray-400" />
    </button>
  {/each}
</ScrollArea>
