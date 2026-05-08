<script lang="ts">
  import Info from "@lucide/svelte/icons/info";
  import Search from "@lucide/svelte/icons/search";
  import UserRoundPlus from "@lucide/svelte/icons/user-round-plus";

  import { phone } from "$phone/state/phone.svelte";
  import { phoneApp } from "../../state/phone-app.svelte";

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
  import { SendEvent } from "$lib/utils/eventsHandlers";
  import { onMount } from "svelte";

  import Ban from "@lucide/svelte/icons/ban";
  import Check from "@lucide/svelte/icons/check";
  import ChevronLeft from "@lucide/svelte/icons/chevron-left";
  import SquarePen from "@lucide/svelte/icons/square-pen";
  import MessageCircle from "@lucide/svelte/icons/message-circle";
  import Phone from "@lucide/svelte/icons/phone";
  import Star from "@lucide/svelte/icons/star";
  import Trash2 from "@lucide/svelte/icons/trash-2";
  import Share from "@lucide/svelte/icons/share";
  import Video from "@lucide/svelte/icons/video";

  let activeTab = $state("all");
  let addContact = $state(false);
  let contactName = $state("");
  let contactNumber = $state("");
  let openContactDrawer = $state<string | null>(null);

  const displayedContacts = $derived(activeTab === "favorites" ? phoneApp.favorites : phoneApp.filteredContacts);
  const hasValidContactNumber = $derived(/^\d{8}$/.test(contactNumber.trim()));

  async function submitContact() {
    const contact = await SendEvent("addContact", {
      cloudId: phone.data.data?.cloudId,
      name: contactName,
      phoneNumber: contactNumber,
    });

    if (!contact) {
      return;
    }

    phoneApp.addContact(contact);
    contactName = "";
    contactNumber = "";
    addContact = false;
  }

  onMount(async () => {
    const cloudId = phone.data.data?.cloudId;
    if (!cloudId) {
      return;
    }

    await phoneApp.fetchContacts(cloudId);
  });

  function getContactDrawerOpen(phoneNumber: string) {
    return () => openContactDrawer === phoneNumber;
  }

  function setContactDrawerOpen(phoneNumber: string) {
    return (open: boolean) => {
      openContactDrawer = open ? phoneNumber : openContactDrawer === phoneNumber ? null : openContactDrawer;
    };
  }

  async function toggleFavorite(contactId: number) {
    const cloudId = phone.data.data?.cloudId;
    if (!cloudId) {
      return;
    }

    const result = await phoneApp.toggleFavorite(cloudId, contactId);
    if (result) {
      openContactDrawer = null;
    }
  }

</script>

<header class="flex items-center justify-between w-full mt-12 px-4 pb-2 space-x-2">
  <div class="bg-input/70 h-8 rounded-lg w-full flex items-center px-3 space-x-2">
    <Search class="size-3.5 text-muted-foreground" />
    <input
      type="text"
      class="bg-transparent text-xs w-full h-full focus:outline-hidden placeholder:text-muted-foreground mt-[0.1rem] tracking-wide"
      placeholder="Search contacts"
      value={phoneApp.searchQuery}
      oninput={(event) => void phoneApp.updateSearchQuery(event.currentTarget.value)}
    />
  </div>

  <Drawer bind:open={addContact}>
    <DrawerTrigger>
      <button class="bg-input/70 min-w-8 min-h-8 rounded-lg flex items-center justify-center group">
        <UserRoundPlus class="size-3.5 text-muted-foreground group-hover:text-foreground" />
      </button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Add Contact</DrawerTitle>
      </DrawerHeader>

      <div class="flex flex-col space-y-2">
        <div class="space-y-2">
          <p class="flex items-center gap-2 text-xs leading-none font-medium">Name</p>
          <div class="bg-input/40 hover:bg-input/50 h-8 rounded-lg w-full flex items-center px-3 space-x-2 border">
            <input
              type="text"
              class="bg-transparent text-xs w-full h-full focus:outline-hidden placeholder:text-muted-foreground mt-[0.1rem] tracking-wide"
              placeholder="Enter name"
              bind:value={contactName}
            />
          </div>
        </div>
        <div class="space-y-2">
          <p class="flex items-center gap-2 text-xs leading-none font-medium">Number</p>
          <div class="bg-input/40 hover:bg-input/50 h-8 rounded-lg w-full flex items-center px-3 space-x-2 border">
            <input
              type="text"
              class="bg-transparent text-xs w-full h-full focus:outline-hidden placeholder:text-muted-foreground mt-[0.1rem] tracking-wide"
              placeholder="Enter phone number"
              bind:value={contactNumber}
            />
          </div>
        </div>
      </div>

      <DrawerFooter>
        <DrawerClose class="w-full">
          <button
            type="button"
            class="bg-input/40 hover:bg-input/50 text-foreground flex h-8 w-full items-center justify-center outline-hidden select-none text-xs font-medium rounded-lg border"
          >
            Cancel
          </button>
        </DrawerClose>

        <button
          type="button"
          class="bg-primary hover:bg-primary/80 text-primary-foreground flex h-8 w-full items-center justify-center outline-hidden select-none text-xs font-medium rounded-lg disabled:opacity-50"
          disabled={!contactName.trim() || !hasValidContactNumber}
          onclick={() => void submitContact()}
        >
          Confirm
        </button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</header>

<div class="px-4 pb-3 border-b">
  <div class="bg-input/70 inline-flex items-center justify-center h-8 p-1 text-muted-foreground rounded-lg w-full">
    <button
      class="w-full inline-flex items-center justify-center rounded-md py-1 text-xs tracking-wide hover:text-foreground {activeTab ===
        'all' && 'bg-background text-foreground shadow-xs'}"
      onclick={() => (activeTab = "all")}
    >
      All
    </button>
    <button
      class="w-full inline-flex items-center justify-center rounded-md py-1 text-xs font-medium tracking-wide hover:text-foreground {activeTab ===
        'favorites' && 'bg-background text-foreground shadow-xs'}"
      onclick={() => (activeTab = "favorites")}
    >
      Favorited
    </button>
  </div>
</div>

<div class="flex flex-col w-full h-[calc(100%-13.2rem)] overflow-y-auto">
  {#if displayedContacts.length === 0}
    <div class="px-4 py-3 text-xs text-muted-foreground">No contacts found.</div>
  {:else}
    {#each displayedContacts as contact (contact.phoneNumber)}
      <Drawer bind:open={getContactDrawerOpen(contact.phoneNumber), setContactDrawerOpen(contact.phoneNumber)}>
        <DrawerTrigger>
          <button
            class="flex items-center justify-between w-full min-h-14 px-4 border-b hover:bg-secondary/20 disabled:opacity-50 text-left group"
          >
            <div class="flex items-center space-x-3">
              {#if contact.avatar}
                <img src={contact.avatar} alt={contact.name} class="size-7 rounded-full" />
              {:else}
                <div
                  class="flex size-7 items-center justify-center rounded-full bg-input/70 text-[0.65rem] font-medium uppercase"
                >
                  {contact.name.slice(0, 2)}
                </div>
              {/if}
              <div class="flex flex-col">
                <span class="block text-xs font-medium">{contact.name}</span>
                <span class="block text-[0.65rem] text-muted-foreground">{contact.phoneNumber}</span>
              </div>
            </div>
            <Info class="size-4 text-muted-foreground group-hover:text-foreground" />
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{contact.name}</DrawerTitle>
          </DrawerHeader>
          <div class="flex flex-col gap-2.5">
            <button
              class="group w-full flex items-center justify-start gap-2.5 font-medium text-sm text-muted-foreground hover:text-foreground"
              onclick={() => {
                phone.telephony.startOutgoingCall({
                  name: contact.name,
                  number: contact.phoneNumber,
                  ...(contact.avatar ? { avatar: contact.avatar } : {}),
                });
                openContactDrawer = null;
              }}
            >
              <Phone class="size-3.5 fill-muted-foreground group-hover:fill-foreground" />
              Call
            </button>
            <button
              class="group w-full flex items-center justify-start gap-2.5 font-medium text-sm text-muted-foreground hover:text-foreground"
              onclick={() => phone.openApp("messages")}
            >
              <MessageCircle class="size-3.5 fill-muted-foreground group-hover:fill-foreground" />
              Message
            </button>
            <!-- <button
              class="group w-full flex items-center justify-start gap-2.5 font-medium text-sm text-muted-foreground hover:text-foreground"
            >
              <Video class="size-3.5 fill-muted-foreground group-hover:fill-foreground" />
              Video
            </button> -->
            <button
              class="group w-full flex items-center justify-start gap-2.5 font-medium text-sm text-muted-foreground hover:text-foreground"
            >
              <SquarePen class="size-3.5 " />
              Edit
            </button>
            <button
              class="group w-full flex items-center justify-start gap-2.5 font-medium text-sm text-muted-foreground hover:text-foreground"
              onclick={() => void toggleFavorite(contact.id)}
            >
              <Star class="size-3.5 {contact.favorited ? 'fill-foreground text-foreground' : ''}" />
              {contact.favorited ? "Unfavorite" : "Favorite"}
            </button>
            <button
              class="group w-full flex items-center justify-start gap-2.5 font-medium text-sm text-muted-foreground hover:text-destructive"
            >
              <Ban class="size-3.5" />
              Remove
            </button>
          </div>
        </DrawerContent>
      </Drawer>
    {/each}
  {/if}
</div>
