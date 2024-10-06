<script>
  import { onMount } from "svelte";
  import { IS_LOCKED, SELECTED_APP } from "@/stores/phone";
  import Lockscreen from "./components/lockscreen.svelte";
  import AppView from "./components/app-view.svelte";
  import Homescreen from "./components/homescreen.svelte";
  import PhoneWrapper from "./components/phone-wrapper.svelte";

  let showHomescreen = true;

  $: {
    if ($SELECTED_APP) {
      setTimeout(() => {
        showHomescreen = false;
      }, 250);
    } else {
      showHomescreen = true;
    }
  }
</script>

<PhoneWrapper>
  {#if $IS_LOCKED}
    <Lockscreen />
  {:else}
    {#if showHomescreen}
      <Homescreen />
    {/if}
    {#if $SELECTED_APP}
      <AppView />
    {/if}
  {/if}
</PhoneWrapper>
