<script lang="ts">
  import { fly } from "svelte/transition";

  import Signal from "@lucide/svelte/icons/signal";
  import Wifi from "@lucide/svelte/icons/wifi";

  import { phone } from "./state/phone.svelte";
  import { calls } from "./state/calls.svelte";
  import { notifications } from "./state/notifications.svelte";

  import AppView from "./components/app-view.svelte";
  import Homescreen from "./components/homescreen.svelte";
  import Lockscreen from "./components/lockscreen.svelte";
  import Notifications from "./components/notifications.svelte";
  import Setup from "./components/setup/setup.svelte";

  let showActiveCallPill = $derived(calls.status !== "idle" && calls.currentCall !== null);
  let shouldPeek = $derived(!phone.visible && (notifications.items.length > 0 || showActiveCallPill));
  let shouldRenderShell = $derived(phone.visible || shouldPeek);

  let showSetup = $derived(phone.visible && phone.openState === "setup");
</script>

{#snippet volumeButton()}
  <div class="w-full min-h-16 bg-[#6f6f6f] shadow-inner shadow-[#2f2f2f] rounded-full"></div>
{/snippet}

{#snippet lockButton()}
  <div
    class="absolute top-36 -right-[0.450rem] z-0 h-24 w-1.5 rounded-full bg-[#6f6f6f] shadow-inner shadow-[#2f2f2f]"
  ></div>
{/snippet}

{#snippet statusBar()}
  <header class="absolute z-50 flex items-center justify-between w-full px-5 pt-4">
    <p class="font-medium text-xs select-none">20:07</p>
    <div class="flex space-x-2">
      <Wifi class="size-3.5 text-foreground" />
      <Signal class="size-3.5" />
    </div>
  </header>
{/snippet}

{#if shouldRenderShell}
  <div
    class={[
      "relative isolate flex h-164 w-84 origin-bottom-right transition-transform duration-300 ease-out",
      shouldPeek ? "translate-y-[91%]" : "translate-y-0",
    ]}
    transition:fly={{ y: shouldPeek ? 250 : 900, duration: 350, opacity: 0 }}
  >
    {@render lockButton()}

    <div class="absolute top-28 -left-[0.450rem] z-0 flex w-1.5 flex-col gap-3">
      {@render volumeButton()}
      {@render volumeButton()}
    </div>

    <div class="relative z-10 flex h-full w-full overflow-hidden rounded-[2rem] bg-black p-1 shadow-frame">
      <div class="w-full h-full rounded-[1.8rem] bg-cover overflow-hidden relative">
        {@render statusBar()}
        <Notifications />
        <div class="h-full">
          {#if showSetup}
            {#key phone.phoneId}
              <Setup />
            {/key}
          {:else if phone.isLocked}
            <Lockscreen />
          {:else}
            {#if phone.showHomescreen}
              <Homescreen />
            {/if}

            {#if phone.activeApp}
              <AppView />
            {/if}
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}
