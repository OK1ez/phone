<script lang="ts">
  import { fly } from "svelte/transition";
  import { ChevronLeft } from "lucide-svelte";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import * as Avatar from "@/components/ui/avatar";
  import Bleet from "../../components/bleet/bleet.svelte";
  import { SELECTED_BLEET } from "../../stores/bleeter";
  import {
    BadgeCheck,
    MoreHorizontal,
    MessageSquare,
    Repeat2,
    Heart,
  } from "lucide-svelte";

  function closeBleet() {
    SELECTED_BLEET.set(null);
  }
</script>

<header class="flex items-center w-full gap-4 px-6 pb-4 mt-16 border-b">
  <button on:click={closeBleet}>
    <ChevronLeft class="w-6 h-6 text-gray-400 hover:text-foreground" />
  </button>
  <h1 class="font-medium">Bleet</h1>
</header>

<ScrollArea class="flex flex-col w-full h-full max-h-[49.5rem] overflow-y-auto">
  {#if $SELECTED_BLEET}
    <div class="flex flex-col w-full border-b p-4">
      <div class="flex w-full gap-4">
        <Avatar.Root>
          <Avatar.Image
            src={$SELECTED_BLEET.avatar}
            alt={`@${$SELECTED_BLEET.username}`}
          />
          <Avatar.Fallback>{$SELECTED_BLEET.displayName[0]}</Avatar.Fallback>
        </Avatar.Root>
        <div class="flex flex-col w-full">
          <div class="flex items-start justify-between w-full">
            <div class="flex flex-col justify-center">
              <div class="flex items-center">
                <p class="text-base font-medium cursor-pointer hover:underline">
                  {$SELECTED_BLEET.displayName}
                </p>
                {#if $SELECTED_BLEET.verified}
                  <BadgeCheck
                    fill="#60a5fa"
                    class="w-5 h-5 ml-1 text-background"
                    strokeWidth={2}
                  />
                {/if}
              </div>
              <p class=" text-sm text-gray-400">
                @{$SELECTED_BLEET.username}
              </p>
            </div>
            <button class="text-gray-400 hover:text-foreground">
              <MoreHorizontal class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <p>{$SELECTED_BLEET.content}</p>
        {#if $SELECTED_BLEET.attachments && $SELECTED_BLEET.attachments.length > 0}
          <div class="mt-1">
            <img
              class="border rounded-lg"
              src={$SELECTED_BLEET.attachments[0]}
              alt="bleeter-image"
            />
          </div>
        {/if}
      </div>
      <div class="mt-4 text-gray-400 text-sm">
        <p>01:32 · 07.10.2024</p>
      </div>
      <div class="flex gap-8 mt-4">
        <button class="flex items-center w-16 text-gray-400 group">
          <MessageSquare
            size="20"
            class="group-hover:fill-blue-400 group-hover:text-blue-400"
          />
          <span class="ml-2">{$SELECTED_BLEET.comments}</span>
        </button>
        <button class="flex items-center w-16 text-gray-400 group">
          <Repeat2
            size="20"
            class="group-hover:fill-emerald-500 group-hover:text-emerald-500"
          />
          <span class="ml-2">{$SELECTED_BLEET.rebleets}</span>
        </button>
        <button class="flex items-center w-16 text-gray-400 group">
          <Heart
            size="20"
            class="group-hover:fill-rose-500 group-hover:text-rose-500"
          />
          <span class="ml-2">{$SELECTED_BLEET.likes}</span>
        </button>
      </div>
    </div>
    <div class="p-4 border-b">
      <h2 class="text-lg font-semibold">Comments</h2>
    </div>

    <Bleet bleet={$SELECTED_BLEET} />
    <Bleet bleet={$SELECTED_BLEET} />
    <Bleet bleet={$SELECTED_BLEET} />
    <Bleet bleet={$SELECTED_BLEET} />
    <Bleet bleet={$SELECTED_BLEET} />
    <Bleet bleet={$SELECTED_BLEET} />
    <Bleet bleet={$SELECTED_BLEET} />
    <Bleet bleet={$SELECTED_BLEET} />
    <Bleet bleet={$SELECTED_BLEET} />
  {/if}
</ScrollArea>
