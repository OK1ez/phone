<script lang="ts">
  import { onMount } from "svelte";

  import { localeManager } from "@/lib/states/locales.svelte";

  import { InitialiseListeners } from "@/lib/utils/listeners";
  import { SendEvent, IsEnvBrowser } from "@/lib/utils/eventsHandlers";
  import { setupKeyHandler } from "@/lib/utils/keyHandler";

  import { InitialiseDebugSenders } from "@/lib/utils/debug/init";
  import { InitialiseDebugReceivers } from "@/lib/utils/debug/receivers";
  import Phone from "./phone/phone.svelte";

  InitialiseListeners();

  if (import.meta.env.DEV && IsEnvBrowser()) {
    InitialiseDebugSenders();
    InitialiseDebugReceivers();
  }

  async function initializeData() {
    let translations = await SendEvent("fetchLocales");
    localeManager.setTranslations(translations);
  }

  onMount(() => {
    // initializeData();
    return setupKeyHandler();
  });
</script>

<main class="flex items-center justify-center">
  <Phone />
</main>
