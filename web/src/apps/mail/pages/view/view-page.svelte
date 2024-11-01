<script lang="ts">
  import { onMount } from "svelte";
  import { ChevronLeft, Trash, Edit, Reply } from "lucide-svelte";
  import { ACTIVE_PAGE, SELECTED_MAIL_ID } from "../../stores/mail";
  import { SendEvent } from "@/utils/eventsHandlers";
  import { fly } from 'svelte/transition';




  let MailReply = $state(false)

  function CancelReply(){
    MailReply = false
  }
  
  
  function ReplyMail(){
    MailReply = true
  }
  

  function DeleteMail() {
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
</script>

<header class="flex items-center justify-between w-full gap-4 px-6 pb-4 mt-[4.5rem] border-b" >
  <button onclick={goBack}>
    <ChevronLeft class="w-6 h-6 text-gray-400 hover:text-foreground" />
  </button>

  {#if mail}
    <button>
      <Trash onclick={DeleteMail} class="w-6 h-6 text-gray-400 hover:text-foreground" />
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

{#if MailReply}
  <div transition:fly={{ y: 500, duration: 300 }} class="absolute bottom-0 flex flex-col  items-stretch  justify-center w-full h-1/2  pb-6 border-t bg-primary-foreground rounded-t-[22px]">
    <button class="absolute top-5 left-5 text-blue-500 cursor-pointer text-[20px]" onclick={CancelReply} >
      Cancel
    </button>
    <div class=" w-full h-[90%] absolute bottom-0">
      <h2 class="text-[42px] font-bold p-3 truncate " >Re: {mail.subject || 'New message'}</h2>
      <input type="text" placeholder="Subject:" class="w-full mb-3 p-2 border-b-[2px] outline-none rounded bg-primary-foreground" />
      <textarea placeholder="Write your message..." class="w-full h-52 p-2 resize-none outline-none overflow-y-a rounded bg-primary-foreground "></textarea>
    </div>
  </div>
{/if}


{#if !MailReply}
  <div class="absolute bottom-0 flex items-center justify-center w-full h-24 px-16 pb-6 border-t bg-background">
    <Reply onclick={ReplyMail} class="w-6 h-9 cursor-pointer" />
  </div>
{/if}
