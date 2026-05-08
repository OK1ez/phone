<script lang="ts">
  import logo from "$lib/assets/logo.png";
  import { useSetupApp } from "../../state/setup-app.svelte";

  const setupApp = useSetupApp();
</script>

<div class="flex h-full w-full flex-col justify-between px-5 pb-6 pt-16">
  <div class="flex w-full justify-center z-10 select-none mt-24">
    <div
      class="size-14 bg-[#D4D4D4]"
      style={`-webkit-mask: url(${logo}) center / contain no-repeat;
              mask: url(${logo}) center / contain no-repeat;`}
    ></div>
  </div>

  <div class="absolute bottom-6 left-0 w-full px-4 space-y-2 z-10">
    <button
      type="button"
      class="bg-primary hover:bg-primary/80 text-primary-foreground flex h-8 w-full items-center justify-center outline-hidden select-none text-xs font-medium tracking-wider rounded-lg disabled:opacity-50"
      onclick={() => setupApp.chooseCreateAccount()}
    >
      Create new account
    </button>
    {#if setupApp?.existingAccounts.length > 0}
      <button
        type="button"
        class="bg-input/30 hover:bg-input/50 text-foreground border flex h-8 w-full items-center justify-center outline-hidden select-none text-xs font-medium tracking-wider rounded-lg disabled:opacity-50"
        onclick={() => setupApp.chooseExistingAccount()}
      >
        Use existing account
      </button>
    {/if}
  </div>
</div>
