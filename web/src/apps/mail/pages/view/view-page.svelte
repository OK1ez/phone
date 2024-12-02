<script lang="ts">
  import { onMount } from "svelte";
  import { ChevronLeft, Trash, Edit, Reply } from "lucide-svelte";
  import { ACTIVE_PAGE, SELECTED_MAIL_ID } from "../../stores/mail";
  import { SendEvent } from "@/utils/eventsHandlers";
  import { fly } from "svelte/transition";
  import * as Drawer from "@/components/ui/drawer";
  import { Button } from "@/components/ui/button";

  function deleteMail() {
    ACTIVE_PAGE.set("inbox");

    SendEvent("mail:deleteById", $SELECTED_MAIL_ID);
  }

  function goBack() {
    ACTIVE_PAGE.set("inbox");
  }

  // todo: we can probaly just get the data from when we select the mail, insted of fetching it again

  let mail = $state({});

  onMount(async () => {
    mail = await SendEvent("mail:fetchById", $SELECTED_MAIL_ID);
  });

  let open = $state(false);
</script>

<header
  class="flex items-center justify-between w-full gap-4 px-6 pb-4 mt-[4.5rem] border-b"
>
  <button onclick={goBack}>
    <ChevronLeft class="w-6 h-6 text-gray-400 hover:text-foreground" />
  </button>

  {#if mail}
    <button>
      <Trash
        onclick={deleteMail}
        class="w-6 h-6 text-gray-400 hover:text-foreground"
      />
    </button>
  {/if}
</header>

{#if mail}
  <div class="flex flex-col gap-4 px-6 py-4">
    <p class="text-base font-medium">{mail.subject}</p>
    <p class="text-sm text-gray-400">{mail.timestamp}</p>
    <p class="text-sm">{mail.content}</p>
  </div>
{/if}

<Drawer.Root bind:open class="">
  <Drawer.Header>
    <Drawer.Title>Drawer Title</Drawer.Title>
    <Drawer.Description>
      Make changes to your profile here. Click save when you're done.
    </Drawer.Description>
  </Drawer.Header>
  <Drawer.Footer>
    <Button>Submit</Button>
    <Button variant="outline">Cancel</Button>
  </Drawer.Footer>
</Drawer.Root>

{#if !open}
  <div
    class="absolute bottom-0 flex items-center justify-center w-full h-24 px-16 pb-6 border-t bg-background"
  >
    <Reply onclick={() => (open = true)} class="w-6 h-9 cursor-pointer" />
  </div>
{/if}
