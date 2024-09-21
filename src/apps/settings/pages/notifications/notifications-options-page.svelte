<script>
  import { ChevronLeft } from "lucide-svelte";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import { Switch } from "@/components/ui/switch";
  import { goBack, SELECTED_NOTIFICATION_APP } from "../../stores/settings";
  import { APPS } from "@/stores/phone";
  import { onMount } from "svelte";

  let appName = "";
  let notificationsEnabled = false;
  let soundsEnabled = false;

  onMount(() => {
    if ($SELECTED_NOTIFICATION_APP && $APPS[$SELECTED_NOTIFICATION_APP]) {
      appName = $APPS[$SELECTED_NOTIFICATION_APP].name;
    }
  });

  function toggleNotifications() {
    notificationsEnabled = !notificationsEnabled;
    console.log("Toggled notifications to", $SELECTED_NOTIFICATION_APP, notificationsEnabled);
  }

  function toggleSounds() {
    soundsEnabled = !soundsEnabled;
    console.log("Toggled sounds to", $SELECTED_NOTIFICATION_APP, soundsEnabled);
  }

  function handleGoBack() {
    SELECTED_NOTIFICATION_APP.set(null);
    goBack();
  }
</script>

<header class="flex items-center w-full gap-4 px-6 pb-4 mt-16 border-b">
  <button on:click={handleGoBack} class="text-gray-400 hover:text-foreground">
    <ChevronLeft className="w-6 h-6" />
  </button>
  <p class="font-medium">{appName}</p>
</header>

<ScrollArea class="flex flex-col w-full h-full max-h-[49.5rem] overflow-y-auto">
  <div class="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
    <p class="text-base">Allow notifications</p>
    <Switch checked={notificationsEnabled} on:click={toggleNotifications} />
  </div>
  <div class="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
    <p class="text-base">Sounds</p>
    <Switch checked={soundsEnabled} on:click={toggleSounds} />
  </div>
</ScrollArea>
