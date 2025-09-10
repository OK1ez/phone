export interface App {
  id: string;
  name: string;
  icon?: string;
}

class PhoneState {
  visible = $state(true);
  isLocked = $state(false);

  apps: App[] = $state([]);
  currentApp: string | null = $state(null);

  lock() {
    this.isLocked = true;
  }

  openApp(id: string) {
    this.currentApp = id;
  }

  closeApp() {
    this.currentApp = null;
  }
}

export const phone = new PhoneState();
