<script lang="ts">
  import { SELECTED_APP, APPS } from "@/stores/phone";
  import Indicator from "./indicator.svelte";
  import BleeterApp from "@/apps/bleeter/bleeter-app.svelte";
  import SettingsApp from "@/apps/settings/settings-app.svelte";
  import MessagesApp from "@/apps/messages/messages-app.svelte";
  import PhoneApp from "@/apps/phone/phone-app.svelte";

  function closeApp() {
    SELECTED_APP.set(null);
  }

  $: selectedApp = $SELECTED_APP;
  $: app = selectedApp && $APPS[selectedApp] ? $APPS[selectedApp] : null;

  const appComponents = {
    bleeter: BleeterApp,
    settings: SettingsApp,
    messages: MessagesApp,
    phone: PhoneApp,
  };
</script>

<div class="relative flex flex-col w-full h-full bg-background">
  {#if app}
    <svelte:component this={appComponents[selectedApp]} />
  {/if}
  <Indicator on:click={closeApp} />
</div>
