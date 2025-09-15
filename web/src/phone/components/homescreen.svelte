<script>
  import Background from "$lib/assets/backgrounds/background.webp";

  import { core } from "$lib/states/core.svelte";
</script>

<div class="absolute flex justify-center w-full h-full bg-cover pt-20" style="background-image: url({Background});">
  <div class="grid grid-cols-4 gap-x-4 gap-y-6 absolute">
    {#each Object.entries(core.apps) as [id, app] (id)}
      <button class="flex flex-col items-center justify-center rounded-lg space-y-2" onclick={() => core.openApp(id)}>
        <div class="size-[3.3rem] rounded-xl bg-secondary" style="background-image: url('');"></div>
        <p class="text-center text-xs">{app.label}</p>
      </button>
    {/each}
  </div>
</div>
