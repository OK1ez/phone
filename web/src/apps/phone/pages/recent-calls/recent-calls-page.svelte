<script>
  import { InfoIcon } from "lucide-svelte";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import { onMount } from "svelte";
  import { SendEvent } from "@/utils/eventsHandlers";

  let recentCalls = [];

  onMount(async () => {
    recentCalls = await SendEvent("recentCalls:fetch", {});
  });
</script>

<header class="flex items-center w-full gap-4 px-6 pb-4 mt-16 border-b">
  <p class="font-medium">Recent calls</p>
</header>

<ScrollArea class="flex flex-col w-full h-full max-h-[49.5rem] overflow-y-auto">
  {#each recentCalls as call}
    <div
      class="flex items-center justify-between w-full px-6 border-b h-14 hover:bg-secondary/70 dark:hover:bg-secondary/20 hover:cursor-pointer"
    >
      <p class="text-base" class:text-red-500={call.missed}>{call.name}</p>
      <div class="flex items-center space-x-4">
        <p class="text-sm text-gray-400">{call.time}</p>
        <div class="cursor-pointer">
          <InfoIcon class="w-4 h-4 text-gray-400 hover:text-foreground" />
        </div>
      </div>
    </div>
  {/each}
</ScrollArea>
