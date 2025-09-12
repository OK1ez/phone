<script>
  import BadgeCheck from "lucide-svelte/icons/badge-check";
  import MoreHorizontal from "lucide-svelte/icons/more-horizontal";
  import MessageSquare from "lucide-svelte/icons/message-square";
  import Repeat2 from "lucide-svelte/icons/repeat-2";
  import Heart from "lucide-svelte/icons/heart";

  let activeTab = $state("for-you");
</script>

<header
  class="flex items-center justify-center w-full mt-[4.5rem] px-6 space-x-12 border-b"
>
  <button
    class="border-b-2 w-[5rem] text-xs font-medium pb-2 {activeTab === 'for-you'
      ? 'border-primary'
      : 'border-transparent text-muted-foreground hover:text-foreground'}"
    onclick={() => (activeTab = "for-you")}
  >
    For You
  </button>
  <button
    class="border-b-2 w-[5rem] text-xs font-medium pb-2 {activeTab ===
    'following'
      ? 'border-primary'
      : 'border-transparent text-muted-foreground hover:text-foreground'}"
    onclick={() => (activeTab = "following")}
  >
    Following
  </button>
</header>

<div class="flex flex-col w-full h-[calc(100%-11.15rem)] overflow-y-auto">
  <div class="w-full border-b px-6 py-4 space-x-4 flex hover:bg-secondary/20">
    <div class="max-h-9 max-w-9 min-w-9 min-h-9 overflow-hidden rounded-full">
      <img
        src="https://static.wikia.nocookie.net/gtawiki/images/c/c0/Bleeter_GTAVpc_rockford_captain67.png"
        alt="avatar"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="flex flex-col w-full space-y-1">
      <div class="flex justify-between items-center w-full">
        <div class="flex items-center space-x-0.5">
          <span
            class="text-sm font-medium hover:underline hover:cursor-pointer"
          >
            OKiez
          </span>
          <BadgeCheck class="size-[1.1rem] text-background" fill="#60a5fa" />
          <span class="text-muted-foreground text-xs">2h</span>
        </div>
        <button class="text-muted-foreground hover:text-foreground">
          <MoreHorizontal class="size-4" />
        </button>
      </div>
      <p class="text-xs leading-relaxed">
        Cillum esse minim proident. Esse aliquip occaecat cupidatat consequat
        est aute est enim culpa ullamco id aliqua. Duis consequat nulla mollit
        laborum cillum ipsum est deserunt adipisicing ut officia dolor laboris
        amet esse. Esse ea ad culpa in magna reprehenderit dolor.
      </p>
      <div class="flex items-center justify-between !mt-3">
        <button
          class="flex items-center space-x-2 text-muted-foreground group transition-all duration-200 outline-none focus:outline-none"
        >
          <Heart
            size="14"
            class="group-hover:text-rose-500 transition-colors"
          />
          <span
            class="text-xs font-medium group-hover:text-rose-500 transition-colors"
          >
            24
          </span>
        </button>
        <button
          class="flex items-center space-x-2 text-muted-foreground group transition-all duration-200 outline-none focus:outline-none"
        >
          <MessageSquare
            size="15"
            class="group-hover:text-blue-500 transition-colors"
          />
          <span
            class="text-xs font-medium group-hover:text-blue-500 transition-colors"
          >
            422
          </span>
        </button>
        <button
          class="flex items-center space-x-2 text-muted-foreground group transition-all duration-200 outline-none focus:outline-none"
        >
          <Repeat2
            size="18"
            class="group-hover:text-emerald-500 transition-colors"
          />
          <span
            class="text-xs font-medium group-hover:text-emerald-500 transition-colors"
          >
            422
          </span>
        </button>
      </div>
    </div>
  </div>
</div>
