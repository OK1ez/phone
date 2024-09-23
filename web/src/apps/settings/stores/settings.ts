import { writable, get } from 'svelte/store';

export const PAGE_STACK = writable<string[]>(['home']);
export const ACTIVE_PAGE = writable<string>('home');
export const NAVIGATION_DIRECTION = writable<'forward' | 'backward'>('forward');
export const SELECTED_NOTIFICATION_APP = writable<string | null>(null);

export function navigateTo(page: string) {
  const stack = get(PAGE_STACK);
  const currentPage = stack[stack.length - 1];

  if (currentPage !== page) {
    PAGE_STACK.update(pages => [...pages, page]);
    setActivePage(page, 'forward');
  }
}

export function goBack() {
  PAGE_STACK.update(pages => {
    if (pages.length > 1) {
      const newStack = pages.slice(0, -1);
      const newActivePage = newStack[newStack.length - 1];
      setActivePage(newActivePage, 'backward');
      return newStack;
    }
    return pages;
  });
}

function setActivePage(page: string, direction: 'forward' | 'backward') {
  ACTIVE_PAGE.set(page);
  NAVIGATION_DIRECTION.set(direction);
}

// temp: will be replaced with actual settings
interface Settings {
  serialNumber: number;
  wallpapers: {
    homescreen: string;
    lockscreen: string;
  };
  display: {
    brightness: number; // useless?
    scale: number;
  };
  unlock: {
    faceUnlock: boolean;
    passcode: number;
  };
}
