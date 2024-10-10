<script lang="ts">
  import { SELECTED_BLEET, SELECTED_USER } from "../../stores/bleeter";
  import * as Avatar from "@/components/ui/avatar";
  import Header from "./header.svelte";
  import Content from "./content.svelte";
  import Actions from "./actions.svelte";
  import type { Bleet } from "@/typings/bleeter";

  export let bleet: Bleet;

  function openBleetFullView(): void {
    SELECTED_BLEET.set(bleet);
  }

  function selectUser(event: MouseEvent): void {
    event.stopPropagation();
    SELECTED_USER.set(bleet.username);
  }
</script>

<div
  class="flex w-full gap-4 p-4 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20 hover:cursor-pointer"
  on:click={openBleetFullView}
>
  <Avatar.Root on:click={selectUser}>
    <Avatar.Image src={bleet.avatar} alt={`@${bleet.username}`} />
    <Avatar.Fallback>{bleet.displayName[0]}</Avatar.Fallback>
  </Avatar.Root>
  <div class="flex flex-col w-full">
    <Header {bleet} {selectUser} />
    <Content {bleet} />
    <Actions {bleet} />
  </div>
</div>
