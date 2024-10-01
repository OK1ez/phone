<script lang="ts">
  import Background from "@/assets/backgrounds/background.webp";
  import { APPS, SELECTED_APP } from "@/stores/phone";

  function openApp(appName: string) {
    SELECTED_APP.set(appName);
  }
</script>

<div
  class="absolute flex justify-center w-full h-full"
  style="background-image: url({Background});"
>
  <div class="grid grid-cols-4 gap-8 absolute mt-16">
    {#each Object.entries($APPS) as [appName, app]}
      <button on:click={() => openApp(appName)}>
        <span class="text-sm">{app.name}</span>
      </button>
    {/each}
  </div>
</div>
