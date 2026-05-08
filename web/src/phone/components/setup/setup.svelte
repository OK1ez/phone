<script lang="ts">
  import { fly } from "svelte/transition";

  import { SendEvent } from "$lib/utils/eventsHandlers";
  import { phone } from "$phone/state/phone.svelte";
  import type { PhoneDataResponse } from "$phone/state/types";
  import { getTransitionDirection } from "$lib/utils/utils";

  import { provideSetupApp, type SetupResult } from "./state/setup-app.svelte";

  type CreateCloudRequest = {
    phoneId: number;
    name: string;
    pin: string;
  };

  type AttachCloudRequest = {
    phoneId: number;
    cloudId: number;
  };

  type SetupCloudResponse = PhoneDataResponse | false;

  let setupError = $state<string | null>(null);

  async function completeSetup(result: SetupResult) {
    const phoneId = phone.phoneId;
    if (!phoneId) {
      return;
    }

    if (result.mode === "existing" && result.selectedCloudId == null) {
      setupError = "Select an account";
      return;
    }

    const phoneData =
      result.mode === "existing"
        ? await SendEvent<SetupCloudResponse, AttachCloudRequest>("attachCloud", {
            phoneId,
            cloudId: result.selectedCloudId,
          })
        : await SendEvent<SetupCloudResponse, CreateCloudRequest>("createCloud", {
            phoneId,
            name: result.phoneName,
            pin: result.pinCode,
          });

    if (!phoneData) {
      setupError = "Setup failed";
      return;
    }

    setupError = null;
    phone.setPhoneData(phoneData);
    phone.unlock();
  }

  const setupApp = provideSetupApp({
    onComplete: completeSetup,
    existingAccounts: phone.setupClouds,
  });
  let CurrentRoute = $derived(setupApp.currentComponent);
</script>

<div class="absolute z-30 flex h-full w-full flex-col bg-background">
  {#if setupError}
    <p class="absolute left-4 right-4 top-12 z-40 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs">
      {setupError}
    </p>
  {/if}

  {#key setupApp.currentRoute}
    <div
      class="absolute h-full w-full"
      in:fly={getTransitionDirection(setupApp.direction).in}
      out:fly={getTransitionDirection(setupApp.direction).out}
    >
      <CurrentRoute />
    </div>
  {/key}
</div>
