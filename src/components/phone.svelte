<script>
  import { IS_LOCKED, SELECTED_APP  } from "@/stores/phone"
  import AppView from "./app-view.svelte";
  import PhoneWrapper from "./phone-wrapper.svelte";
  import Lockscreen from "./lockscreen.svelte";
  import Homescreen from "./homescreen.svelte";
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