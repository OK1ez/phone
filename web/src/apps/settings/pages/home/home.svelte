<script lang="ts">
  import { Switch } from "$lib/components/ui/switch";

  import ChevronRight from "@lucide/svelte/icons/chevron-right";
  import PlaneTakeoff from "@lucide/svelte/icons/plane-takeoff";
  import Video from "@lucide/svelte/icons/video";
  import BellDot from "@lucide/svelte/icons/bell-dot";
  import { settings } from "$phone/state/settings.svelte";

  import { settingsApp } from "../../state/settings-app.svelte";
</script>

<header class="flex items-center w-full mt-12 px-4 pb-3 border-b">
  <p class="font-medium text-sm">Settings</p>
</header>

<div class="flex flex-col w-full h-[calc(100%-6.9rem)] overflow-y-auto pb-6">
  <button
    class="flex items-center justify-between w-full min-h-14 px-4 border-b hover:bg-secondary/20 disabled:opacity-50"
    onclick={() => void settings.setDeviceSetting("airplaneMode", !(settings.device?.airplaneMode ?? false))}
  >
    <div class="flex items-center h-full space-x-4">
      <PlaneTakeoff class="size-5" />
      <p class="text-xs">Airplane mode</p>
    </div>
    <Switch
      checked={settings.device?.airplaneMode ?? false}
      onChange={(value) => {
        void settings.setDeviceSetting("airplaneMode", value);
      }}
    />
  </button>
  <button
    class="flex items-center justify-between w-full min-h-14 px-4 border-b hover:bg-secondary/20 disabled:opacity-50"
    onclick={() => void settings.setDeviceSetting("streamerMode", !(settings.device?.streamerMode ?? false))}
  >
    <div class="flex items-center h-full space-x-4">
      <Video class="size-5" />
      <p class="text-xs">Streamer mode</p>
    </div>
    <Switch
      checked={settings.device?.streamerMode ?? false}
      onChange={(value) => {
        void settings.setDeviceSetting("streamerMode", value);
      }}
    />
  </button>
  <button
    class="flex items-center justify-between w-full min-h-14 px-4 border-b hover:bg-secondary/20 disabled:opacity-50 group"
    onclick={() => settingsApp.navigate("notifications")}
  >
    <div class="flex items-center h-full space-x-4">
      <BellDot class="size-5" />
      <p class="text-xs">Notifications</p>
    </div>
    <ChevronRight class="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
  </button>
</div>
