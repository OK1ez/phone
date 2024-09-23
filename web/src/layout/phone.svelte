<script>
  import { IS_LOCKED, SELECTED_APP  } from "@/stores/phone"
  import Lockscreen from "./components/lockscreen.svelte";
  import AppView from "./components/app-view.svelte";
  import Homescreen from "./components/homescreen.svelte";
  import PhoneWrapper from "./components/phone-wrapper.svelte";

</script>

<PhoneWrapper>
  {#if $IS_LOCKED}
    <Lockscreen />
  {:else if $SELECTED_APP}
    <AppView />
  {:else}
    <Homescreen />
  {/if}
</PhoneWrapper>