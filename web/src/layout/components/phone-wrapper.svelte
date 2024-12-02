<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { Signal, WifiHigh, Volume2, VolumeX, Volume1 } from "lucide-svelte";
  import { IS_LOCKED, IS_DARK_MODE } from "@/stores/phone";
  import Notch from "./notch.svelte";
  import Notifications from "./notifications.svelte";
  import { VISIBLE } from "@/stores/stores";

  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();

  /**
   * Control volume.
   */

  let volumeSlider: HTMLDivElement;
  let volume = $state(0);
  let showVolume = $state(false);
  let volumeTimeout: ReturnType<typeof setTimeout>;

  function volumeUp(event: MouseEvent) {
    event.stopPropagation();
    volume = Math.min(volume + 20, 100);
    showVolumeControl();
  }

  function volumeDown(event: MouseEvent) {
    event.stopPropagation();
    volume = Math.max(volume - 20, 0);
    showVolumeControl();
  }

  function showVolumeControl() {
    showVolume = true;
    clearTimeout(volumeTimeout);
    volumeTimeout = setTimeout(() => {
      showVolume = false;
    }, 2000);
  }

  function handleClickOutside(event: MouseEvent) {
    if (
      showVolume &&
      volumeSlider &&
      !volumeSlider.contains(event.target as Node)
    ) {
      showVolume = false;
    }
  }

  $effect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  /**
   * Mute phone.
   */

  let muted = $state(false);

  function mutePhone(event: MouseEvent) {
    event.stopPropagation();
    muted = true;
    volume = 0;
    showVolumeControl();
  }

  /**
   * Locks the phone.
   */
  function lock(): void {
    IS_LOCKED.set(true);
  }

  let flyParams = $derived({
    y: $VISIBLE === "half-visible" ? 200 : 800,
    duration: 350,
  });
</script>

<div
  class="absolute flex w-[30rem] h-[63rem] right-0 bottom-0 transition-all duration-300 {$VISIBLE ===
  'half-visible'
    ? '-mb-[43rem]'
    : '-mb-[5rem]'}"
  style="scale: 0.7"
  transition:fly={flyParams}
  class:dark={$IS_DARK_MODE}
  class:text-foreground={$IS_DARK_MODE}
>
  <button
    class="absolute w-1.5 h-32 bg-gray-500 shadow-inner shadow-[#241D24] rounded-full top-48 right-[-10px]"
    aria-label="Lock"
    onclick={lock}
  ></button>

  <div class="h-32 w-1.5 absolute flex flex-col left-[-10px] top-36">
    <button
      class="w-full min-h-12 bg-gray-500 shadow-inner shadow-[#241D24] rounded-full mb-8"
      aria-label="Mute"
      onclick={mutePhone}
    ></button>
    <button
      class="w-full min-h-24 bg-gray-500 shadow-inner shadow-[#241D24] rounded-full mb-4"
      aria-label="Volume up"
      onclick={volumeUp}
    ></button>

    <button
      class="w-full min-h-24 bg-gray-500 shadow-inner shadow-[#241D24] rounded-full"
      aria-label="Volume down"
      onclick={volumeDown}
    ></button>
  </div>

  <!-- Phone content -->
  <div
    class="w-full h-full bg-black rounded-[3.4rem] shadow-frame flex z-10 p-2 overflow-hidden"
  >
    <!-- <Notch /> -->
    <div
      class="w-full h-full rounded-[3rem] bg-cover bg-black overflow-hidden relative"
    >
      <header
        class="absolute z-50 flex items-center justify-between w-full px-8 pt-4"
      >
        <p class="font-medium">13:03</p>
        <button class="flex gap-2" aria-label="Control center">
          <WifiHigh class="mb-2 w-7 h-7" />
          <Signal class="w-6 h-6 mt-[0.40rem]" />
        </button>
      </header>
      <Notifications />
      {@render children?.()}
    </div>

    {#if showVolume}
      <div
        bind:this={volumeSlider}
        class="w-[3.4375rem] h-[12.5rem] top-[13.75rem] left-[1.25rem] rounded-xl bg-muted absolute overflow-hidden"
        transition:fly={{ x: -10, duration: 500 }}
      >
        <div class="absolute bottom-0 w-full" style="height: {volume}%;">
          <div class="bg-white w-full h-full"></div>
        </div>
        {#if volume === 0}
          <VolumeX
            color="#4f4f4f"
            class="w-full h-[1.875rem] absolute bottom-[0.875rem]"
          />
        {:else if volume < 50}
          <Volume1
            color="#4f4f4f"
            class="w-full h-[1.875rem] absolute bottom-[0.875rem]"
          />
        {:else}
          <Volume2
            color="#4f4f4f"
            class="w-full h-[1.875rem] absolute bottom-[0.875rem]"
          />
        {/if}
      </div>
    {/if}
  </div>
</div>
