<script lang="ts">
  import { phone } from "$phone/state/phone.svelte";
  import { notifications } from "$phone/state/notifications.svelte";

  import { Switch } from "$lib/components/ui/switch";

  import ChevronLeft from "@lucide/svelte/icons/chevron-left";

  import { settingsApp } from "../../state/settings-app.svelte";
</script>

<!-- use app icon here? -->

<button
  class="flex items-center w-full space-x-2 mt-12 px-4 pb-3 border-b group"
  onclick={() => settingsApp.navigate("notifications", true)}
>
  <ChevronLeft class="size-4 text-muted-foreground group-hover:text-foreground" />
  <p class="font-medium text-sm">Applications</p>
</button>

<div class="flex flex-col w-full h-[calc(100%-6.9rem)] overflow-y-auto pb-6">
  {#each phone.apps as app (app.id)}
    <button
      class="flex items-center justify-between w-full min-h-14 px-4 border-b hover:bg-secondary/20 disabled:opacity-50"
      onclick={() => notifications.setAppEnabled(app.id, !(notifications.preferences[app.id]?.enabled ?? true))}
    >
      <div class="flex items-center h-full space-x-4">
        <div class="size-7 rounded-lg bg-secondary" style="background-image: url('');"></div>
        <p class="text-xs">{app.label}</p>
      </div>
      <Switch class="pointer-events-none" checked={notifications.preferences[app.id]?.enabled ?? true} />
    </button>
  {/each}
</div>
