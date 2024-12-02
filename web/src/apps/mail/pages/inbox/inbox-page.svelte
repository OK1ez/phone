<script>
  import { ChevronRight, SendHorizontal } from "lucide-svelte";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import { truncate } from "@/utils/misc";
  import { openMail } from "../../stores/mail";
  import { onMount } from "svelte";
  import { SendEvent } from "@/utils/eventsHandlers";
  import { fly } from "svelte/transition";
  import * as Drawer from "@/components/ui/drawer";
  import { Button } from "@/components/ui/button";

  let createMailDrawer = $state(false);
  let subject = $state("");

  function openNewMail() {
    createMailDrawer = true;
  }

  function cancelNewMail() {
    createMailDrawer = false;
  }

  let mails = $state([]);

  onMount(async () => {
    mails = await SendEvent("mail:fetchRecents", {});
  });
</script>

<header
  class="flex items-center justify-between w-full gap-4 px-6 pb-4 mt-[4.5rem] border-b"
>
  <p class="font-medium text-[20px]">Inbox</p>
</header>

<ScrollArea class="flex flex-col w-full h-full max-h-[49.5rem] overflow-y-auto">
  {#if mails}
    {#each mails as mail}
      <button
        class="flex flex-col w-full px-6 py-4 text-left border-b hover:bg-secondary/70 dark:hover:bg-secondary/20"
        onclick={() => openMail(mail.id)}
      >
        <div class="flex justify-between w-full">
          <span class="text-base font-medium">{mail.subject}</span>
          <div class="flex items-center space-x-2 text-gray-400">
            <span class="text-sm">{mail.timestamp}</span>
            <ChevronRight class="w-4 h-4" />
          </div>
        </div>
        <span class="text-sm text-gray-400">
          {truncate(mail.content)}
        </span>
      </button>
    {/each}
  {/if}
</ScrollArea>

<Drawer.Root bind:open={createMailDrawer} class="">
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

{#if !createMailDrawer}
  <div
    class="absolute bottom-0 flex items-center justify-center w-full h-24 px-16 pb-6 border-t bg-background"
  >
    <span class="font-medium">{mails.length} Mails</span>
    <SendHorizontal
      onclick={openNewMail}
      class="absolute right-7 bottom-13 w-6 h-9 cursor-pointer"
    />
  </div>
{/if}
