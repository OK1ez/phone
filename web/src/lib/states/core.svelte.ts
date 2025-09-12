import SettingsApp from "@/apps/settings/settings-app.svelte";
import MessagesApp from "@/apps/messages/messages-app.svelte";
import MailApp from "@/apps/mail/mail-app.svelte";
import PhoneApp from "@/apps/phone/phone-app.svelte";
import BleeterApp from "@/apps/bleeter/bleeter-app.svelte";

export interface App {
  id: string;
  name: string;
  icon?: string;
  component: any;
}

export interface AppRoute {
  label: string;
  component: any;
}

class CoreState {
  visible = $state(true);
  isLocked = $state(false);

  apps: Record<string, AppRoute> = {
    phone: {
      label: "Phone",
      component: PhoneApp,
    },
    settings: {
      label: "Settings",
      component: SettingsApp,
    },
    messages: {
      label: "Messages",
      component: MessagesApp,
    },
    mail: {
      label: "Mail",
      component: MailApp,
    },
    bleeter: {
      label: "Bleeter",
      component: BleeterApp,
    },
  };

  currentApp: string | null = $state(null);

  lock() {
    this.isLocked = true;
  }

  openApp(id: string) {
    if (this.apps[id]) {
      this.currentApp = id;
    }
  }

  closeApp() {
    this.currentApp = null;
  }

  getCurrentAppComponent() {
    return this.currentApp
      ? (this.apps[this.currentApp]?.component ?? null)
      : null;
  }
}

export const core = new CoreState();
