<script>
  import { scale } from "svelte/transition";
  import { phone } from "@/lib/states/phone.svelte";

  import Indicator from "./indicator.svelte";

  import SettingsApp from "@/apps/settings/settings-app.svelte";
  import MessagesApp from "@/apps/messages/messages-app.svelte";
  import MailApp from "@/apps/mail/mail-app.svelte";

  function closeApp() {
    phone.currentApp = null;
  }
</script>

<div
  class="relative flex flex-col w-full h-full bg-background"
  transition:scale={{ start: 0.5, duration: 250 }}
>
  {#if phone.currentApp === "settings"}
    <SettingsApp />
  {:else if phone.currentApp === "messages"}
    <MessagesApp />
  {:else if phone.currentApp === "mail"}
    <MailApp />
  {/if}
  <Indicator onclick={closeApp} />
</div>
