<script lang="ts">
  import { settingsApp } from "../../settings.svelte";

  import { Switch } from "$lib/components/ui/switch";

  import ChevronRight from "@lucide/svelte/icons/chevron-right";
  import PlaneTakeoff from "@lucide/svelte/icons/plane-takeoff";
  import Video from "@lucide/svelte/icons/video";
  import BellDot from "@lucide/svelte/icons/bell-dot";
  import AudioLines from "@lucide/svelte/icons/audio-lines";
  import Image from "@lucide/svelte/icons/image";

  // temp logic

  let airplaneMode = $state(false);

  function toggleAirplaneMode() {
    airplaneMode = !airplaneMode;
  }

  let streamerMode = $state(false);

  function toggleStreamerMode() {
    streamerMode = !streamerMode;
  }
</script>

<header class="flex items-center w-full mt-[4.5rem] px-6 pb-4 border-b">
  <p class="font-medium text-sm">Settings</p>
</header>

<div class="flex flex-col w-full h-[calc(100%-6.9rem)] overflow-y-auto pb-6">
  <button
    class="flex items-center justify-between w-full min-h-16 px-6 border-b hover:bg-secondary/20 disabled:opacity-50"
    onclick={toggleAirplaneMode}
  >
    <div class="flex items-center h-full space-x-4">
      <PlaneTakeoff class="size-5" />
      <div class="text-left space-y-0.5">
        <p class="text-xs">Airplane mode</p>
        <p class="text-xs text-muted-foreground">Fake a flight and dodge distractions!</p>
      </div>
    </div>
    <Switch checked={airplaneMode} onChange={(value) => (airplaneMode = value)} />
  </button>
  <button
    class="flex items-center justify-between w-full min-h-16 px-6 border-b hover:bg-secondary/20 disabled:opacity-50"
    onclick={toggleStreamerMode}
  >
    <div class="flex items-center h-full space-x-4">
      <Video class="size-5" />
      <div class="text-left space-y-0.5">
        <p class="text-xs">Streamer mode</p>
        <p class="text-xs text-muted-foreground">Hides sensitive information</p>
      </div>
    </div>
    <Switch checked={streamerMode} onChange={(value) => (streamerMode = value)} />
  </button>
  <button
    class="flex items-center justify-between w-full min-h-16 px-6 border-b hover:bg-secondary/20 disabled:opacity-50 group"
    onclick={() => settingsApp.navigate("notifications")}
  >
    <div class="flex items-center h-full space-x-4">
      <BellDot class="size-5" />
      <div class="text-left space-y-0.5">
        <p class="text-xs">Notifications</p>
        <p class="text-xs text-muted-foreground">Where chaos begins (or ends)</p>
      </div>
    </div>
    <ChevronRight class="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
  </button>
  <button
    class="flex items-center justify-between w-full min-h-16 px-6 border-b hover:bg-secondary/20 disabled:opacity-50 group"
    disabled
  >
    <div class="flex items-center h-full space-x-4">
      <AudioLines class="size-5" />
      <div class="text-left space-y-0.5">
        <p class="text-xs">Sounds</p>
        <p class="text-xs text-muted-foreground">Change ringtone and alerts</p>
      </div>
    </div>
    <ChevronRight class="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
  </button>
  <button
    class="flex items-center justify-between w-full min-h-16 px-6 border-b hover:bg-secondary/20 disabled:opacity-50 group"
    disabled
  >
    <div class="flex items-center h-full space-x-4">
      <Image class="size-5" />
      <div class="text-left space-y-0.5">
        <p class="text-xs">Customize</p>
        <p class="text-xs text-muted-foreground">Customize your phone</p>
      </div>
    </div>
    <ChevronRight class="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
  </button>
</div>
