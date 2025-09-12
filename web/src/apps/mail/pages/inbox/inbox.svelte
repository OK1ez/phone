<script>
  import { turncate } from "@/lib/utils/utils";
  import { mailApp } from "../../mail.svelte";

  import ChevronRight from "lucide-svelte/icons/chevron-right";
</script>

<header class="flex items-center w-full mt-[4.5rem] px-6 pb-4 border-b">
  <p class="font-medium text-sm">Inbox</p>
</header>

<div class="flex flex-col w-full h-[calc(100%-7.9rem)] overflow-y-auto pb-6">
  <button
    class="flex flex-col justify-center w-full min-h-16 px-6 border-b hover:bg-secondary/20 disabled:opacity-50 text-left space-y-0.5 group"
    onclick={() => mailApp.navigate("view")}
  >
    <div class="flex justify-between">
      <span class="text-xs font-medium">Important Meeting</span>
      <div class="flex items-center space-x-1 text-muted-foreground">
        <span class="text-xs -mt-[0.1rem]">Yesterday</span>
        <ChevronRight
          class="size-4 text-muted-foreground group-hover:text-foreground"
        />
      </div>
    </div>
    <span class="text-xs text-muted-foreground">
      {turncate(
        "We need to discuss the upcoming project. Please prepare a brief summary.",
        50,
      )}
    </span>
  </button>
</div>
