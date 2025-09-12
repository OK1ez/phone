<script lang="ts">
  import { settingsApp } from "../../settings.svelte";

  import { Switch } from "@/lib/components/ui/switch";

  import ChevronLeft from "lucide-svelte/icons/chevron-left";
  import ChevronRight from "lucide-svelte/icons/chevron-right";
  import Layers from "lucide-svelte/icons/layers";
  import BellDot from "lucide-svelte/icons/bell-dot";

  // temp logic

  let muteNotifications = $state(true);

  function toggleMuteNotifications() {
    muteNotifications = !muteNotifications;
  }
</script>

<button
  class="flex items-center w-full space-x-2 mt-[4.5rem] px-6 pb-4 border-b"
  onclick={() => settingsApp.navigate("settings", true)}
>
  <ChevronLeft class="size-5 text-muted-foreground hover:text-foreground" />
  <p class="font-medium text-sm">Notifications</p>
</button>

<div class="flex flex-col w-full h-full">
  <button
    class="flex items-center justify-between w-full min-h-16 px-6 border-b hover:bg-secondary/20 disabled:opacity-50"
    onclick={toggleMuteNotifications}
  >
    <div class="flex items-center h-full space-x-4">
      <BellDot class="size-5" />
      <div class="text-left space-y-0.5">
        <p class="text-xs">General</p>
        <p class="text-xs text-muted-foreground">
          Toggle notifications on everything
        </p>
      </div>
    </div>
    <Switch
      checked={muteNotifications}
      onChange={(value) => (muteNotifications = value)}
    />
  </button>
  <button
    class="flex items-center justify-between w-full min-h-16 px-6 border-b hover:bg-secondary/20 disabled:opacity-50 group"
    onclick={() => settingsApp.navigate("notifications_applications")}
  >
    <div class="flex items-center h-full space-x-4">
      <Layers class="size-5" />
      <div class="text-left space-y-0.5">
        <p class="text-xs">Applications</p>
        <p class="text-xs text-muted-foreground">
          Manage notifications per app
        </p>
      </div>
    </div>
    <ChevronRight
      class="w-4 h-4 text-muted-foreground group-hover:text-foreground"
    />
  </button>
</div>
