<script lang="ts">
  import { onMount } from "svelte";
  import { ChevronLeft, Trash } from "lucide-svelte";
  import { ACTIVE_PAGE, SELECTED_MAIL_ID } from "../../stores/mail";
  import { SendEvent } from "@/utils/eventsHandlers";

  function goBack() {
    ACTIVE_PAGE.set("inbox");
  }

  // todo: we can probaly just get the data from when we select the mail, insted of fetching it again

  let mail = $state({});

  onMount(async () => {
    mail = await SendEvent("mail:fetchById", $SELECTED_MAIL_ID);
  });
</script>

<header
  class="flex items-center justify-between w-full gap-4 px-6 pb-4 mt-[4.5rem] border-b"
>
  <button onclick={goBack}>
    <ChevronLeft class="w-6 h-6 text-gray-400 hover:text-foreground" />
  </button>
  <button>
    <Trash class="w-6 h-6 text-gray-400 hover:text-foreground" />
  </button>
</header>

{#if mail}
  <div class="flex flex-col gap-4 px-6 py-4">
    <p class="text-base font-medium">{mail.subject}</p>
    <p class="text-sm text-gray-400">{mail.timestamp}</p>
    <p class="text-sm">{mail.content}</p>
  </div>
{/if}
