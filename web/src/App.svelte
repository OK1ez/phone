<script lang="ts">
  import { IsEnvBrowser } from "$lib/utils/eventsHandlers";
  import { InitialiseListeners } from "$lib/utils/listeners";

  import { phone } from "./phone/state/phone.svelte";

  import DebugMenu from "$lib/components/debug-menu.svelte";
  import ImageViewer from "$lib/components/image-viewer.svelte";
  import Phone from "./phone/phone.svelte";

  InitialiseListeners();

  function handleKeydown(event: KeyboardEvent) {
    if (event.code === "Escape" && phone.device.visible) {
      void phone.hide();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<main class="flex items-end justify-end p-8" class:bg-background={IsEnvBrowser()}>
  <DebugMenu />
  <Phone />
</main>

<ImageViewer image={phone.mediaViewer.activeImage} onClose={() => phone.mediaViewer.closeImage()} />
