<script lang="ts">
  import { fade, fly } from "svelte/transition";

  import type { DrawerHost } from "./drawer-context.svelte";
  import DrawerRenderer from "./drawer-renderer.svelte";

  let { host }: { host: DrawerHost } = $props();
</script>

{#each host.drawers as drawer (drawer.id)}
  {#if drawer.open && drawer.content}
    <button
      type="button"
      class="absolute inset-0 z-60 bg-background/70 backdrop-blur-[1px] cursor-default"
      aria-label="Close drawer"
      onclick={drawer.close}
      transition:fade={{ duration: 150 }}
    ></button>

    <div class="absolute inset-x-0 bottom-0 z-80 flex items-end">
      <div class="w-full p-4 pb-8" transition:fly={{ y: 24, duration: 200 }}>
        <div class="bg-background w-full rounded-xl border border-border/60 p-4 shadow-xs {drawer.className}">
          <DrawerRenderer {drawer} />
        </div>
      </div>
    </div>
  {/if}
{/each}
