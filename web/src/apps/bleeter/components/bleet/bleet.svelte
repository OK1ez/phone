<script lang="ts">
  import * as Avatar from "@/components/ui/avatar";
  import Header from "./header.svelte";
  import Content from "./content.svelte";
  import Actions from "./actions.svelte";

  export let bleet: any;
</script>

<div
  class="flex w-full gap-4 p-4 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20 hover:cursor-pointer"
>
  <Avatar.Root>
    <Avatar.Image src={bleet.avatar} alt={`@${bleet.username}`} />
    <Avatar.Fallback>{bleet.displayName[0]}</Avatar.Fallback>
  </Avatar.Root>
  <div class="flex flex-col w-full">
    <Header {bleet} />
    <Content {bleet} />
    <Actions {bleet} />
  </div>
</div>
