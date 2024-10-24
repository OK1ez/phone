<script lang="ts">
  import { SELECTED_APP } from "@/stores/phone";
  import { scale } from "svelte/transition";
  import type { SvelteComponent } from "svelte";

  import Indicator from "./indicator.svelte";
  import BleeterApp from "@/apps/bleeter/bleeter-app.svelte";
  import SettingsApp from "@/apps/settings/settings-app.svelte";
  import MessagesApp from "@/apps/messages/messages-app.svelte";
  import PhoneApp from "@/apps/phone/phone-app.svelte";
  import MailApp from "@/apps/mail/mail-app.svelte";

  const appComponents: Record<string, typeof SvelteComponent> = {
    bleeter: BleeterApp,
    settings: SettingsApp,
    messages: MessagesApp,
    phone: PhoneApp,
    mail: MailApp,
  };

  // Closes the currently open app.
  function closeApp(): void {
    SELECTED_APP.set(null);
  }
</script>

<div
  class="relative flex flex-col w-full h-full bg-background"
  transition:scale={{ start: 0.5, duration: 250 }}
>
  {#if $SELECTED_APP}
    {@const AppComponent = appComponents[$SELECTED_APP]}
    <AppComponent />
  {/if}
  <Indicator onclick={closeApp} />
</div>
