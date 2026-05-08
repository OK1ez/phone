<script lang="ts">
  import { useSetupApp } from "../../state/setup-app.svelte";

  const setupApp = useSetupApp();
  let pinCode = $derived(setupApp.pinCode);
</script>

<div class="flex h-full w-full flex-col justify-between px-5 pb-6 pt-16">
  <div class="space-y-4">
    <div class="space-y-0.5">
      <p class="text-base font-medium">Create a PIN</p>
      <p class="text-xs text-muted-foreground">Use this PIN to protect the phone.</p>
    </div>

    <div class="bg-input/40 hover:bg-input/60 h-8 rounded-lg w-full flex items-center px-3 space-x-2 border">
      <input
        type="text"
        inputmode="numeric"
        maxlength="4"
        class="bg-transparent text-xs w-full h-full focus:outline-hidden placeholder:text-muted-foreground mt-[0.1rem] tracking-wide"
        placeholder="Enter PIN code"
        value={pinCode}
        oninput={(event) => setupApp.setPinCode(event.currentTarget.value)}
      />
    </div>
  </div>

  <div class="absolute bottom-6 left-0 w-full flex px-4 space-x-2 z-10">
    <button
      type="button"
      class="bg-input/30 hover:bg-input/50 text-foreground flex h-8 w-full items-center justify-center outline-hidden select-none text-xs font-medium rounded-lg border disabled:opacity-50"
      onclick={() => setupApp.navigate("phone_name", true)}
    >
      Return
    </button>
    <button
      type="button"
      class="bg-primary hover:bg-primary/80 text-primary-foreground flex h-8 w-full items-center justify-center outline-hidden select-none text-xs font-medium rounded-lg disabled:opacity-50"
      onclick={() => setupApp.submitPinCode()}
      disabled={setupApp.pinCode.trim() === ""}
    >
      Finish
    </button>
  </div>
</div>
