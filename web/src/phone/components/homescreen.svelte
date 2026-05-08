<script lang="ts">
  import Background from "$lib/assets/backgrounds/background.webp";
  import { phone } from "$phone/state/phone.svelte";
</script>

<div class="absolute flex justify-center w-full h-full bg-cover pt-14" style="background-image: url({Background});">
  <div class="grid grid-cols-4 gap-x-4 gap-y-6 absolute">
    {#each phone.apps as app (app.id)}
      <button
        class="relative flex flex-col items-center justify-center rounded-lg space-y-2"
        onclick={() => phone.openApp(app.id)}
      >
        <div class="size-13 rounded-xl bg-secondary" style="background-image: url('');"></div>
        <p class="text-center text-xs">{app.label}</p>
      </button>
    {/each}
  </div>
</div>
