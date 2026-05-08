<script lang="ts">
  import { formatPhoneNumber } from "$lib/utils/format";

  import { useSetupApp } from "../../state/setup-app.svelte";

  const setupApp = useSetupApp();

  let selectedCloudId = $state(setupApp.existingAccounts[0]?.cloudId);
</script>

<div class="flex h-[calc(100%-4.2rem)] w-full flex-col overflow-y-auto pb-6 pt-16">
  <div class="space-y-0.5 px-4 mb-4">
    <p class="text-base font-medium">Select an account</p>
    <p class="text-xs text-muted-foreground">Choose an existing account to link to this phone.</p>
  </div>
  <div class="flex flex-col px-4 space-y-2">
    {#each setupApp.existingAccounts as account (account.cloudId)}
      <button
        type="button"
        class="flex flex-col items-start space-y-0.5 select-none p-2.5 border rounded-lg {selectedCloudId ===
        account.cloudId
          ? 'border-primary/20 bg-primary/10'
          : 'hover:bg-primary/5'}"
        onclick={() => {
          selectedCloudId = account.cloudId;
        }}
      >
        <p class="text-xs font-medium">{account.name}</p>
        <p class="text-xs text-muted-foreground">{formatPhoneNumber(account.phoneNumber)}</p>
      </button>
    {/each}
  </div>
  <div class="absolute bottom-6 left-0 w-full flex px-4 space-x-2 z-10">
    <button
      type="button"
      class="bg-input/30 hover:bg-input/50 text-foreground flex h-8 w-full items-center justify-center outline-hidden select-none text-xs font-medium rounded-lg border disabled:opacity-50"
      onclick={() => setupApp.navigate("account_choice", true)}
    >
      Return
    </button>
    <button
      type="button"
      class="bg-primary hover:bg-primary/80 text-primary-foreground flex h-8 w-full items-center justify-center outline-hidden select-none text-xs font-medium rounded-lg disabled:opacity-50"
      onclick={() => setupApp.selectExistingAccount(selectedCloudId)}
      disabled={selectedCloudId == null}
    >
      Finish
    </button>
  </div>
</div>
