<script lang="ts">
    import { fly } from "svelte/transition";
    import RecentMessagesPage from "./pages/recent-messages/recent-messages-page.svelte";
    import ConversationPage from "./pages/conversation/conversation-page.svelte";
    import { ACTIVE_PAGE, SELECTED_CONVERSATION_ID } from "./stores/messages";
</script>

<div class="relative flex flex-col w-full h-full bg-background">
    {#if $ACTIVE_PAGE === "recent"}
        <div
            class="absolute w-full h-full"
            transition:fly={{ x: -500, duration: 300 }}
        >
            <RecentMessagesPage />
        </div>
    {:else if $ACTIVE_PAGE === "conversation"}
        <div
            class="absolute w-full h-full"
            transition:fly={{ x: 500, duration: 300 }}
        >
            <ConversationPage conversationId={$SELECTED_CONVERSATION_ID} />
        </div>
    {/if}
</div>
