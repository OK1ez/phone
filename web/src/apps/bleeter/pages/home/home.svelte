<script>
  import BleeterPost from "../../components/bleeter-post.svelte";

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
  <BleeterPost
    avatar="https://static.wikia.nocookie.net/gtawiki/images/c/c0/Bleeter_GTAVpc_rockford_captain67.png"
    username="OKiez"
    verified={true}
    timestamp="2h"
    content="Cillum esse minim proident. Esse aliquip occaecat cupidatat consequat est aute est enim culpa ullamco id aliqua. Duis consequat nulla mollit laborum cillum ipsum est deserunt adipisicing ut officia dolor laboris amet esse. Esse ea ad culpa in magna reprehenderit dolor."
    likes={750}
    comments={422}
    reposts={422}
  />
</div>
