<script>
  import { ChevronRight,Edit } from "lucide-svelte";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import { truncate } from "@/utils/misc";
  import { openMail} from "../../stores/mail";

  import { onMount } from "svelte";
  import { SendEvent } from "@/utils/eventsHandlers";


  import NewMail from '../newmail/new-page.svelte';
  import { fly } from 'svelte/transition';
  let showNewMail = $state(false);
  let subject = $state("");
  function openNewMail() {
    showNewMail = true;
  }

  function CancelNewMail() {
    showNewMail = false;
  }
  
  
 

  let mails = $state([]);

  onMount(async () => {
    mails = await SendEvent("mail:fetchRecents", {});
  }); 



</script>

<header class="flex items-center justify-between w-full gap-4 px-6 pb-4 mt-[4.5rem] border-b" >

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




{#if showNewMail}
  <div transition:fly={{ y: 500, duration: 300 }} class="absolute bottom-0 flex flex-col  items-stretch  justify-center w-full h-1/2  pb-6 border-t bg-primary-foreground rounded-t-[22px]">
    <button class="absolute top-5 left-5 text-blue-500 cursor-pointer text-[20px]" onclick={CancelNewMail}>
      Cancel
    </button>
    <div class=" w-full h-[90%] absolute bottom-0">
      <h2 class="text-[42px] font-bold p-3 truncate " >{subject || 'New message'}</h2>
      <input type="text" placeholder="To:" class="w-full mb-3 p-2 border-b-[2px] outline-none rounded bg-primary-foreground" />
      <input type="text" placeholder="Subject:" bind:value={subject} class="w-full mb-3 p-2 border-b-[2px] outline-none rounded bg-primary-foreground" />
      <textarea placeholder="Write your message..." class="w-full h-52 p-2 resize-none outline-none overflow-y-a rounded bg-primary-foreground "></textarea>
    </div>
  </div>
{/if}
{#if !showNewMail}
  <div class="absolute bottom-0 flex items-center justify-center w-full h-24 px-16 pb-6 border-t bg-background">
    <span>{mails.length} Mails</span>
    <Edit onclick={openNewMail} class="absolute right-7 bottom-13 w-6 h-9 cursor-pointer" />
  </div>
{/if}