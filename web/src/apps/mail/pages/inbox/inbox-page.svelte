<script>
  import { ChevronRight } from "lucide-svelte";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import { truncate } from "@/utils/misc";
  import { MAILS, openMail } from "../../stores/mail";
</script>

<header
  class="flex items-center justify-between w-full gap-4 px-6 pb-4 mt-[4.5rem] border-b"
>
  <p class="font-medium">Inbox</p>
</header>

<ScrollArea class="flex flex-col w-full h-full max-h-[49.5rem] overflow-y-auto">
  {#each $MAILS as mail}
    <button
      class="flex flex-col w-full px-6 py-4 text-left border-b hover:bg-secondary/70 dark:hover:bg-secondary/20"
      on:click={() => openMail(mail.id)}
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
</ScrollArea>
