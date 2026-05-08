<script lang="ts">
  import { notifications } from "$phone/state/notifications.svelte";

  import { Switch } from "$lib/components/ui/switch";

  import ChevronLeft from "@lucide/svelte/icons/chevron-left";
  import ChevronRight from "@lucide/svelte/icons/chevron-right";
  import Layers from "@lucide/svelte/icons/layers";
  import BellDot from "@lucide/svelte/icons/bell-dot";

  import { settingsApp } from "../../state/settings-app.svelte";
</script>

<button
  class="flex items-center w-full space-x-2 mt-12 px-4 pb-3 border-b group"
  onclick={() => settingsApp.navigate("settings", true)}
>
  <ChevronLeft class="size-4 text-muted-foreground group-hover:text-foreground" />
  <p class="font-medium text-sm">Notifications</p>
</button>

<div class="flex flex-col w-full h-full">
  <button
    class="flex items-center justify-between w-full min-h-14 px-4 border-b hover:bg-secondary/20 disabled:opacity-50"
    onclick={() => notifications.setMuted(!notifications.muted)}
  >
    <div class="flex items-center h-full space-x-4">
      <BellDot class="size-5" />
      <p class="text-xs">Mute all notifications</p>
    </div>
    <Switch checked={notifications.muted} onChange={(value) => notifications.setMuted(value)} />
  </button>
  <button
    class="flex items-center justify-between w-full min-h-14 px-4 border-b hover:bg-secondary/20 disabled:opacity-50 group"
    onclick={() => settingsApp.navigate("notifications_applications")}
  >
    <div class="flex items-center h-full space-x-4">
      <Layers class="size-5" />
      <p class="text-xs">Applications</p>
    </div>
    <ChevronRight class="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
  </button>
</div>
