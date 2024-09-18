<script lang="ts">
  import { APPS, SELECTED_APP } from "@/stores/phone";

  function openApp(appName: string) {
    SELECTED_APP.set(appName);
  }
</script>

<div class="grid grid-cols-3 gap-4 mt-16 homescreen p-4">
  {#each Object.entries($APPS) as [appName, app]}
    <button on:click={() => openApp(appName)}>
      <span class="text-sm">{app.name}</span>
    </button>
  {/each}
</div>