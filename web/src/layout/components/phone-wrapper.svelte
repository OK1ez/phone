<script lang="ts">
  import { fly } from "svelte/transition";
  import { Signal, WifiHigh } from "lucide-svelte";
  import { IS_LOCKED } from "@/stores/phone";
  import Notch from "./notch.svelte";
  import Notifications from "./notifications.svelte";
  import { VISIBLE } from "@/stores/stores";

  /**
   * Locks the phone.
   */
  function lock(): void {
    IS_LOCKED.set(true);
  }

  $: flyParams = {
    y: $VISIBLE === "half-visible" ? 200 : 800,
    duration: 350,
  };
</script>

<div
  class="absolute flex w-[30rem] h-[63rem] right-0 bottom-0 transition-all duration-300 {$VISIBLE ===
    'half-visible' && '-mb-[43rem]'}"
  style="scale: 0.8"
  transition:fly={flyParams}
>
  <button
    class="absolute w-1.5 h-32 bg-gray-500 shadow-inner shadow-[#241D24] rounded-full top-48 right-[-10px]"
    aria-label="Lock"
    on:click={lock}
  />

  <div class="h-32 w-1.5 absolute flex flex-col left-[-10px] top-36">
    <button
      class="w-full min-h-12 bg-gray-500 shadow-inner shadow-[#241D24] rounded-full mb-8"
      aria-label="Mute"
    />
    <button
      class="w-full min-h-24 bg-gray-500 shadow-inner shadow-[#241D24] rounded-full mb-4"
      aria-label="Volume up"
    />
    <button
      class="w-full min-h-24 bg-gray-500 shadow-inner shadow-[#241D24] rounded-full"
      aria-label="Volume down"
    />
  </div>

  <!-- Phone content -->
  <div
    class="w-full h-full bg-black rounded-[3.4rem] shadow-frame flex z-10 p-2 overflow-hidden"
  >
    <Notch />
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
      <slot />
    </div>
  </div>
</div>
