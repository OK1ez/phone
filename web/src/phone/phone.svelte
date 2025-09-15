<script lang="ts">
  import { core } from "$lib/states/core.svelte";

  import Wifi from "@lucide/svelte/icons/wifi";
  import Signal from "@lucide/svelte/icons/signal";

  import Lockscreen from "./components/lockscreen.svelte";
  import Homescreen from "./components/homescreen.svelte";
  import AppView from "./components/app-view.svelte";

  let showHomescreen = $state(true);

  // makes app opening look nice
  $effect(() => {
    if (core.currentApp) {
      const timeout = setTimeout(() => {
        showHomescreen = false;
      }, 250);

      return () => clearTimeout(timeout);
    } else {
      showHomescreen = true;
    }
  });
</script>

{#snippet volumeButton()}
  <div class="w-full min-h-20 bg-[#6f6f6f] shadow-inner shadow-[#2f2f2f] rounded-full"></div>
{/snippet}

{#snippet lockButton()}
  <button
    class="absolute w-1.5 h-28 bg-[#6f6f6f] shadow-inner shadow-[#2f2f2f] rounded-full top-36 -right-2"
    aria-label="Lock Phone"
    onclick={() => core.lock()}
  ></button>
{/snippet}

{#snippet statusBar()}
  <header class="absolute z-50 flex items-center justify-between w-full px-8 pt-6">
    <p class="font-medium">20:07</p>
    <div class="flex space-x-2">
      <Wifi class="size-5" />
      <Signal class="size-5" />
    </div>
  </header>
{/snippet}

<div class="absolute flex w-[23rem] h-[46rem] scale-90">
  {@render lockButton()}

  <div class="w-1.5 absolute flex flex-col -left-2 top-28 gap-4">
    {@render volumeButton()}
    {@render volumeButton()}
  </div>

  <div class="w-full h-full bg-black rounded-[2rem] shadow-frame flex p-1.5 overflow-hidden">
    <div class="w-full h-full rounded-[1.8rem] bg-cover overflow-hidden relative">
      {@render statusBar()}
      <div class="h-full">
        {#if core.isLocked}
          <Lockscreen />
        {:else}
          {#if showHomescreen}
            <Homescreen />
          {/if}

          {#if core.currentApp}
            <AppView />
          {/if}
        {/if}
      </div>
    </div>
  </div>
</div>
