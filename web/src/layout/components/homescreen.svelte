<script lang="ts">
  import Background from "@/assets/backgrounds/background.webp";
  import { APPS, SELECTED_APP } from "@/stores/phone";

  /**
   * Opens the specified app.
   * @param appName - The name of the app to open.
   */
  function openApp(appName: string): void {
    SELECTED_APP.set(appName);
  }
</script>

<div
  class="absolute flex justify-center w-full h-full"
  style="background-image: url({Background});"
>
  <div class="grid grid-cols-4 gap-8 absolute mt-20">
    {#each Object.entries($APPS) as [appName, app]}
      <button
        class="flex flex-col items-center justify-center rounded-lg space-y-1"
        on:click={() => openApp(appName)}
      >
        <div
          class="size-[4.5rem] rounded-2xl bg-secondary"
          style="background-image: url({app.icon});"
        ></div>
        <p class="text-center text-sm">{app.name}</p>
      </button>
    {/each}
  </div>
</div>
