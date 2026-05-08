<script lang="ts">
  import Background from "$lib/assets/backgrounds/background.webp";
  import { SendEvent } from "$lib/utils/eventsHandlers";
  import type { PhoneDataResponse } from "$phone/state/types";
  import { quintOut } from "svelte/easing";
  import { slide } from "svelte/transition";
  import { phone } from "$phone/state/phone.svelte";

  type UnlockPhoneRequest = {
    cloudId: number;
    pin: string;
  };

  type UnlockPhoneResponse = PhoneDataResponse | false;

  let pinCode = $state("");

  function setPinCode(value: string) {
    pinCode = value.replace(/\D/g, "").slice(0, 4);
  }

  async function unlock() {
    const cloudId = phone.data.activeCloudId;
    if (!cloudId || !pinCode) {
      return;
    }

    const phoneData = await SendEvent<UnlockPhoneResponse, UnlockPhoneRequest>("unlockPhone", {
      cloudId,
      pin: pinCode,
    });

    if (!phoneData) {
      return;
    }

    phone.data.setPhoneData(phoneData);
    phone.unlock();
    pinCode = "";
  }
</script>

<div
  class="absolute w-full h-full flex items-center justify-center bg-cover z-30 px-6"
  style="background-image: url({Background});"
  out:slide={{ duration: 400, easing: quintOut, axis: "y" }}
>
  <div class="mt-auto mb-6 flex w-full flex-col gap-2">
    <div class="bg-background h-8 rounded-lg w-full flex items-center px-3 space-x-2 border">
      <input
        type="password"
        inputmode="numeric"
        maxlength="4"
        class="bg-transparent text-xs w-full h-full focus:outline-hidden placeholder:text-muted-foreground mt-[0.1rem] tracking-wide"
        placeholder="PIN"
        value={pinCode}
        oninput={(event) => setPinCode(event.currentTarget.value)}
      />
    </div>

    <button
      type="button"
      class="bg-primary hover:bg-primary/80 text-primary-foreground flex h-8 w-full items-center justify-center outline-hidden select-none text-xs font-medium tracking-wider rounded-lg disabled:opacity-50"
      disabled={!pinCode}
      onclick={unlock}
    >
      Unlock
    </button>
  </div>
</div>
