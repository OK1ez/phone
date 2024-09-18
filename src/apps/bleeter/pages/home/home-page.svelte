<script lang="ts">
  import { ScrollArea } from "@/components/ui/scroll-area";
  import * as Tabs from "@/components/ui/tabs";
  import Bleet from "../../components/bleet/bleet.svelte";
</script>
    
<Tabs.Root value="for-you">
  <Tabs.List class="w-full mt-16 bg-transparent border-b rounded-none space-x-36">
    <Tabs.Trigger value="for-you" class="border-b-2 border-transparent rounded-none data-[state=active]:border-foreground py-2 text-base mb-1">
      For you
    </Tabs.Trigger>
    <Tabs.Trigger value="following" class="border-b-2 border-transparent rounded-none data-[state=active]:border-foreground py-2 text-base mb-1">
      Following
    </Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="for-you" class="py-0 my-0">
    <ScrollArea class="flex flex-col w-full h-full max-h-[49.5rem] overflow-y-auto">
      <Bleet />
      <Bleet />
      <Bleet />
      <Bleet />
      <Bleet />
      <Bleet />
      <Bleet />
      <Bleet />
    </ScrollArea>
  </Tabs.Content>
  <Tabs.Content value="following">
      This shit dont work.
  </Tabs.Content>
</Tabs.Root>