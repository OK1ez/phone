<script lang="ts">
  import { settings } from "../../settings.svelte";

  import { Switch } from "@/lib/components/ui/switch";

  import ChevronLeft from "lucide-svelte/icons/chevron-left";
  import PlaneTakeoff from "lucide-svelte/icons/plane-takeoff";

  // temp logic

  let phoneNotifications = $state(false);

  function togglePhoneNotifications() {
    phoneNotifications = !phoneNotifications;
  }

  let messagesNotifications = $state(false);

  function toggleMessagesNotifications() {
    messagesNotifications = !messagesNotifications;
  }

  let bleeterNotifications = $state(false);

  function toggleBleeterNotifications() {
    bleeterNotifications = !bleeterNotifications;
  }
</script>

<!-- use app icon here? -->

<button
  class="flex items-center w-full space-x-2 mt-[4.5rem] px-6 pb-4 border-b"
  onclick={() => settings.navigate("notifications", true)}
>
  <ChevronLeft class="size-5 text-muted-foreground hover:text-foreground" />
  <p class="font-medium text-sm">Applications</p>
</button>

<div class="flex flex-col w-full h-[calc(100%-6.9rem)] overflow-y-auto pb-6">
  <button
    class="flex items-center justify-between w-full min-h-14 px-6 border-b hover:bg-secondary/20 disabled:opacity-50"
    onclick={togglePhoneNotifications}
  >
    <div class="flex items-center h-full space-x-4">
      <PlaneTakeoff class="size-5" />
      <p class="text-xs">Phone</p>
    </div>
    <Switch
      checked={phoneNotifications}
      onChange={(value) => (phoneNotifications = value)}
    />
  </button>
  <button
    class="flex items-center justify-between w-full min-h-14 px-6 border-b hover:bg-secondary/20 disabled:opacity-50"
    onclick={toggleMessagesNotifications}
  >
    <div class="flex items-center h-full space-x-4">
      <PlaneTakeoff class="size-5" />
      <p class="text-xs">Messages</p>
    </div>
    <Switch
      checked={messagesNotifications}
      onChange={(value) => (messagesNotifications = value)}
    />
  </button>
  <button
    class="flex items-center justify-between w-full min-h-14 px-6 border-b hover:bg-secondary/20 disabled:opacity-50"
    onclick={toggleBleeterNotifications}
  >
    <div class="flex items-center h-full space-x-4">
      <PlaneTakeoff class="size-5" />
      <p class="text-xs">Bleeter</p>
    </div>
    <Switch
      checked={bleeterNotifications}
      onChange={(value) => (bleeterNotifications = value)}
    />
  </button>
</div>
