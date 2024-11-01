<script lang="ts">
  import { fly } from "svelte/transition";
  import { ACTIVE_PAGE } from "./stores/mail";
  import InboxPage from "./pages/inbox/inbox-page.svelte";
  import ViewPage from "./pages/view/view-page.svelte";

  // import NewMail from "./pages/newmail/new-page.svelte";


  // import MailBottom from "./components/MailBottom.svelte";

</script>

<div class="relative flex flex-col w-full h-full bg-background">
  {#if $ACTIVE_PAGE === "inbox"}
    <div
      class="absolute w-full h-full"
      transition:fly={{ x: -500, duration: 300 }}
    >
    <InboxPage />

    <!-- <MailBottom/> -->

    </div>
  {:else if $ACTIVE_PAGE === "view"}
    <div
      class="absolute w-full h-full"
      transition:fly={{ x: 500, duration: 300 }}
    >
      <ViewPage />
    </div>
  {/if}
</div>
