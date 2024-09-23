<script lang="ts">
  import { BadgeCheck, MoreHorizontal, Trash2, UserPlus, Flag } from "lucide-svelte";
  import * as DropdownMenu from "@/components/ui/dropdown-menu";
  import * as AlertDialog from "@/components/ui/alert-dialog";

  let alertDialogOpen: boolean = false
</script>
  
<div class="flex justify-between w-full">
  <div class="flex items-center">
    <p class="text-base font-medium cursor-pointer hover:underline">
      OKiez
    </p>
    <BadgeCheck fill="#60a5fa" class="w-5 h-5 ml-1 text-background" strokeWidth={2} />
    <p class="ml-1 text-sm text-gray-400">
      @okiez · 4h
    </p>
  </div>
  <!-- <p class="text-sm text-gray-400">Ad</p> -->

  <DropdownMenu.Root>
    <DropdownMenu.Trigger class="text-gray-400 hover:text-foreground">
      <MoreHorizontal class="w-5 h-5" />
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="mt-2 min-w-48" align="start" side="left">
      <DropdownMenu.Group>
      <DropdownMenu.Item class="space-x-2">
        <Trash2 class="w-3 h-3" />
        <span class="text-xs">Remove post</span>
      </DropdownMenu.Item>
      <DropdownMenu.Item class="space-x-2">
        <UserPlus class="w-3 h-3" />
        <span class="text-xs">Follow  okiez</span>
      </DropdownMenu.Item>
      <DropdownMenu.Item class="space-x-2">
        <Flag class="w-3 h-3" />
        <span class="text-xs">Report post</span>
      </DropdownMenu.Item>
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</div>
    
<AlertDialog.Root bind:open={alertDialogOpen}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently remove the post from your account.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action>Continue</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>