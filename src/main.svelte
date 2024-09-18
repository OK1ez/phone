<script>
  import { ModeWatcher } from "mode-watcher";
  import ModeToggle from "./components/mode-toggle.svelte";
  import Phone from "./components/phone.svelte";
</script>

<main class='flex flex-col items-center w-screen h-screen'>
  <Phone />
  <ModeToggle />
  <ModeWatcher />
</main>