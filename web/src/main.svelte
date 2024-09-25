<script>
  import { ModeWatcher } from "mode-watcher";
  import Phone from "./layout/phone.svelte";
  import Dev from "./components/dev.svelte";
  import { VISIBLE } from "./stores/phone"
</script>

<main class='flex flex-col items-center w-screen h-screen'>
  {#if $VISIBLE}
    <Phone />
  {/if}
  <Dev />
  <ModeWatcher />
</main>
