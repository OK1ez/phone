<script lang="ts">
  import { SELECTED_APP } from "@/stores/phone";
  import { scale } from 'svelte/transition';
  import Indicator from "./indicator.svelte";
  import BleeterApp from "@/apps/bleeter/bleeter-app.svelte";
  import SettingsApp from "@/apps/settings/settings-app.svelte";
  import MessagesApp from "@/apps/messages/messages-app.svelte";
  import PhoneApp from "@/apps/phone/phone-app.svelte";

  function closeApp() {
    SELECTED_APP.set(null);
  }

  const appComponents: { [key: string]: any } = {
    bleeter: BleeterApp,
    settings: SettingsApp,
    messages: MessagesApp,
    phone: PhoneApp,
  };
</script>

<div
  class="relative flex flex-col w-full h-full bg-background"
  transition:scale={{ start: 0.5, duration: 250 }} 
>
  {#if $SELECTED_APP}
   <svelte:component this={appComponents[$SELECTED_APP]} />
  {/if}
  <Indicator on:click={closeApp} />
</div>