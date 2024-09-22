<script lang="ts">
  import { SELECTED_APP } from "@/stores/phone";
  import { scale } from 'svelte/transition';
  import Indicator from "./indicator.svelte";
  import { onMount } from 'svelte';

  let AppComponent: any = null;

  $: loadComponent($SELECTED_APP);

  async function loadComponent(appName: string | null) {
    if (!appName) {
      AppComponent = null;
      return;
    }

    try {
      const module = await import(`@/apps/${appName}/${appName}-app.svelte`);
      AppComponent = module.default;
    } catch (error) {
      console.error('Failed to load component:', error);
      AppComponent = null;
    }
  }

  function closeApp() {
    SELECTED_APP.set(null);
  }

  onMount(() => {
    loadComponent($SELECTED_APP);
  });
</script>

<div
  class="relative flex flex-col w-full h-full bg-background"
  transition:scale={{ start: 0.5, duration: 250 }}
>
  {#if $SELECTED_APP && AppComponent}
    <svelte:component this={AppComponent} />
  {/if}
  <Indicator on:click={closeApp} />
</div>
