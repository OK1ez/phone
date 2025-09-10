<script lang="ts">
  import { mail } from "../../mail.svelte";

  import ChevronLeft from "lucide-svelte/icons/chevron-left";
  import Trash from "lucide-svelte/icons/trash";

  const mailData = {
    subject: "Important Meeting",
    timestamp: "Yesterday",
    content:
      "We need to discuss the upcoming project. Please prepare a brief summary.",
  };
</script>

<header
  class="flex items-center justify-between w-full mt-[4.5rem] px-6 pb-4 border-b"
>
  <button
    class="group relative flex items-center justify-center size-10 -m-3"
    onclick={() => mail.navigate("inbox", true)}
  >
    <ChevronLeft
      class="size-5 text-muted-foreground group-hover:text-foreground"
    />
  </button>
  <button class="group relative flex items-center justify-center size-10 -m-3">
    <Trash class="size-4 text-muted-foreground group-hover:text-foreground" />
  </button>
</header>

<div class="flex flex-col w-full h-full overflow-y-auto p-6 space-y-3">
  <h1 class="text-lg font-medium">{mailData.subject}</h1>
  <p class="text-xs text-muted-foreground">{mailData.timestamp}</p>
  <p class="text-sm">{mailData.content}</p>
</div>
