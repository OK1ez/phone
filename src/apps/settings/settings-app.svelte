<script lang="ts">
  import { ACTIVE_PAGE } from "./stores/settings";
  import HomePage from "./pages/home/home-page.svelte";

  const pageComponents: { [key: string]: any } = {
    home: HomePage,
  };

  function renderActivePage() {
    return pageComponents[$ACTIVE_PAGE];
  }
</script>

<div class="relative flex flex-col w-full h-full bg-background">
  <svelte:component this={renderActivePage()} />
</div>