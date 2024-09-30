<script lang="ts">
    import { Search, PlusCircle, ChevronRight } from "lucide-svelte";
    import { ScrollArea } from "@/components/ui/scroll-area";
    import { CONVERSATIONS, openConversation } from "../../stores/messages";
    import { truncate } from "@/utils/misc";
</script>

<header class="flex flex-col w-full pb-4 border-b">
    <div class="flex items-center justify-between w-full h-12 gap-4 px-6 mt-16">
        <div
            class="flex items-center w-full h-12 gap-2 px-4 text-lg font-medium transition-all rounded-full bg-secondary dark:bg-secondary/30"
        >
            <Search class="text-gray-400" />
            <input
                type="text"
                placeholder="Search"
                class="font-normal bg-transparent min-w-14 focus:outline-none"
            />
        </div>
        <button
            class="flex items-center justify-center h-12 font-bold rounded-full font-base min-w-12 bg-secondary dark:bg-secondary/30 group"
        >
            <PlusCircle
                class="w-5 h-5 text-gray-400 group-hover:text-foreground"
            />
        </button>
    </div>
</header>

<ScrollArea class="flex flex-col w-full h-full max-h-[49.5rem] overflow-y-auto">
    {#each $CONVERSATIONS as conversation}
        <button
            on:click={() => openConversation(conversation.id)}
            class="flex flex-col w-full px-6 py-4 text-left border-b hover:bg-secondary/70 dark:hover:bg-secondary/20"
        >
            <div class="flex justify-between w-full">
                <span class="text-base font-medium">{conversation.name}</span>
                <div class="flex items-center space-x-2 text-gray-400">
                    <span class="text-sm">{conversation.lastMessageTime}</span>
                    <ChevronRight class="w-4 h-4" />
                </div>
            </div>
            <span class="text-sm text-gray-400">
                {truncate(conversation.lastMessage)}
            </span>
        </button>
    {/each}
</ScrollArea>
