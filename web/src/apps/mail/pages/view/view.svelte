<script lang="ts">
  import ChevronLeft from "@lucide/svelte/icons/chevron-left";
  import Trash from "@lucide/svelte/icons/trash";

  import { mailApp } from "../../state/mail-app.svelte";

  import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "$lib/components/ui/drawer";

  let deleteMail = $state(false);
</script>

<header class="flex shrink-0 items-center justify-between w-full mt-12 px-4 pb-3 border-b">
  <button class="flex items-center space-x-2 group" onclick={() => mailApp.navigate("inbox", true)}>
    <ChevronLeft class="size-4 text-muted-foreground group-hover:text-foreground" />
    <p class="font-medium text-sm">View</p>
  </button>
  <div class="flex space-x-1">
    <Drawer bind:open={deleteMail}>
      <DrawerTrigger>
        <button class="group relative flex items-center justify-center size-6 -my-3">
          <Trash class="size-3.5 text-muted-foreground group-hover:text-foreground" />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you sure?</DrawerTitle>
          <DrawerDescription>Deleting this mail will permanently remove it from your inbox.</DrawerDescription>
        </DrawerHeader>

        <DrawerFooter>
          <DrawerClose class="w-full">
            <button
              type="button"
              class="bg-input/30 hover:bg-input/50 text-foreground flex h-8 w-full items-center justify-center outline-hidden select-none text-xs font-medium rounded-lg border"
            >
              Cancel
            </button>
          </DrawerClose>

          <button
            type="button"
            class="bg-primary hover:bg-primary/80 text-primary-foreground flex h-8 w-full items-center justify-center outline-hidden select-none text-xs font-medium rounded-lg"
          >
            Confirm
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </div>
</header>

<div class="flex flex-col w-full h-full overflow-y-auto p-4 space-y-2">
  <h1 class="text-lg font-medium">{mailApp.selectedMessage?.subject ?? "No Message"}</h1>
  <p class="text-xs text-muted-foreground">{mailApp.selectedMessage?.timestamp ?? ""}</p>
  <p class="text-xs">{mailApp.selectedMessage?.content ?? "Select a message from the inbox."}</p>
</div>
