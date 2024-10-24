<script>
  import { preventDefault } from 'svelte/legacy';

  import { onMount } from "svelte";
  import { ChevronLeft, User, Lock, UserPlus } from "lucide-svelte";
  import { goBack, navigateTo } from "../../stores/settings";

  let fullName = $state('');
  let username = $state('');
  let password = $state('');
  let isSignUp = $state(false);

  // todo?: add support for going back mulitple pages insted of this
  function returnToMainPage() {
    goBack();
    goBack();
  }

  function handleSubmit() {
    if (isSignUp) {
      console.log('Sign up attempt with:', fullName, username, password);
    } else {
      console.log('Login attempt with:', username, password);
      // goBack();
    }
  }

  function toggleMode() {
    isSignUp = !isSignUp;
    fullName = '';
    username = '';
    password = '';
  }
</script>

<header class="flex items-center w-full gap-4 px-6 pb-4 mt-16 border-b">
  <button onclick={returnToMainPage} class="text-gray-400 hover:text-foreground">
    <ChevronLeft class="w-6 h-6" />
  </button>
  <p class="font-medium">Cloud {isSignUp ? 'Sign Up' : 'Login'}</p>
</header>

<div class="flex flex-col w-full h-full max-h-[49.5rem] overflow-y-auto">
  <form onsubmit={preventDefault(handleSubmit)}>
    {#if isSignUp}
      <div class="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
        <div class="flex items-center space-x-4 w-full">
          <User />
          <input
            type="text"
            bind:value={fullName}
            class="text-gray-400 bg-transparent border-none focus:outline-none w-full"
            placeholder="Full Name"
            required
          >
        </div>
      </div>
    {/if}

    <div class="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
      <div class="flex items-center space-x-4 w-full">
        <User />
        <input
          type="text"
          bind:value={username}
          class="text-gray-400 bg-transparent border-none focus:outline-none w-full"
          placeholder="Username"
          required
        >
      </div>
    </div>

    <div class="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
      <div class="flex items-center space-x-4 w-full">
        <Lock />
        <input
          type="password"
          bind:value={password}
          class="text-gray-400 bg-transparent border-none focus:outline-none w-full"
          placeholder="Password"
          required
        >
      </div>
    </div>

    <button type="submit" class="flex items-center justify-between w-full h-16 px-6 border-b hover:bg-secondary/70 dark:hover:bg-secondary/20">
      <div class="flex items-center space-x-4">
        <UserPlus />
        <p class="text-base">{isSignUp ? 'Create Account' : 'Login'}</p>
      </div>
      <ChevronLeft class="w-4 h-4 text-gray-400 rotate-180" />
    </button>
  </form>

  <div class="w-full flex items-center justify-center py-4 text-gray-400">
    <button onclick={toggleMode}>{isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign up"}</button>
  </div>
</div>
