import { getContext, onDestroy, setContext, type Snippet } from "svelte";

const drawerHostContextKey = Symbol("drawer-host");
const drawerRootContextKey = Symbol("drawer-root");

export class DrawerInstance {
  id: string;
  open = $state(false);
  className = $state("");
  content = $state<Snippet | undefined>(undefined);
  close: () => void = () => {
    this.open = false;
  };

  constructor(id: string, initialOpen = false) {
    this.id = id;
    this.open = initialOpen;
  }
}

export class DrawerHost {
  drawers = $state.raw<DrawerInstance[]>([]);

  add(drawer: DrawerInstance) {
    if (this.drawers.includes(drawer)) {
      return;
    }

    this.drawers = [...this.drawers, drawer];
  }

  remove(drawer: DrawerInstance) {
    this.drawers = this.drawers.filter((entry) => entry !== drawer);
  }
}

export type DrawerRootContext = {
  drawer: DrawerInstance;
  setOpen: (value: boolean) => void;
  toggle: () => void;
  close: () => void;
};

export function createDrawerHostContext() {
  const host = new DrawerHost();
  setContext(drawerHostContextKey, host);
  return host;
}

export function getDrawerHostContext() {
  return getContext<DrawerHost>(drawerHostContextKey);
}

export function setDrawerRootContext(context: DrawerRootContext) {
  setContext(drawerRootContextKey, context);
  return context;
}

export function getDrawerRootContext() {
  return getContext<DrawerRootContext>(drawerRootContextKey);
}

export function registerDrawer(drawer: DrawerInstance) {
  const host = getDrawerHostContext();
  host.add(drawer);

  onDestroy(() => {
    host.remove(drawer);
  });

  return host;
}
