import { getContext, setContext } from "svelte";

import { createAppRouter } from "$apps/shared/create-app-router.svelte";
import type { PhoneCloudAccount, SetupMode } from "$phone/state/types";

import AccountChoice from "../pages/account-choice/account-choice.svelte";
import ExistingAccount from "../pages/existing-account/existing-account.svelte";
import PhoneName from "../pages/phone-name/phone-name.svelte";
import PinCode from "../pages/pin-code/pin-code.svelte";

export type SetupAccount = PhoneCloudAccount;

export interface SetupResult {
  mode: SetupMode;
  selectedCloudId: number | null;
  phoneName: string;
  pinCode: string;
}

interface CreateSetupAppOptions {
  onComplete: (result: SetupResult) => void;
  existingAccounts?: SetupAccount[];
}

export function createSetupApp({ onComplete, existingAccounts = [] }: CreateSetupAppOptions) {
  const router = createAppRouter({
    routes: {
      account_choice: {
        label: "Setup",
        component: AccountChoice,
      },
      existing_account: {
        label: "Existing Account",
        component: ExistingAccount,
      },
      phone_name: {
        label: "Phone Name",
        component: PhoneName,
      },
      pin_code: {
        label: "PIN Code",
        component: PinCode,
      },
    },
    initialRoute: "account_choice",
  });

  let mode = $state<SetupMode>("create");
  let selectedCloudId = $state<number | null>(null);
  let phoneName = $state("");
  let pinCode = $state("");

  function complete() {
    onComplete({
      mode,
      selectedCloudId,
      phoneName,
      pinCode,
    });
  }

  return {
    router,
    existingAccounts,
    get routes() {
      return router.routes;
    },
    get currentRoute() {
      return router.currentRoute;
    },
    get direction() {
      return router.direction;
    },
    get currentComponent() {
      return router.currentComponent;
    },
    get mode() {
      return mode;
    },
    get selectedCloudId() {
      return selectedCloudId;
    },
    get phoneName() {
      return phoneName;
    },
    get pinCode() {
      return pinCode;
    },
    chooseCreateAccount() {
      mode = "create";
      selectedCloudId = null;
      router.navigate("phone_name");
    },
    chooseExistingAccount() {
      mode = "existing";
      router.navigate("existing_account");
    },
    selectExistingAccount(cloudId: number | null | undefined) {
      if (cloudId == null) {
        return;
      }

      mode = "existing";
      selectedCloudId = cloudId;
      complete();
    },
    setPhoneName(value: string) {
      phoneName = value;
    },
    setPinCode(value: string) {
      pinCode = value.replace(/\D/g, "").slice(0, 4);
    },
    submitPhoneName() {
      if (phoneName.trim() === "") {
        return;
      }

      router.navigate("pin_code");
    },
    submitPinCode() {
      if (pinCode.trim() === "") {
        return;
      }

      complete();
    },
    navigate(routeId: keyof typeof router.routes, back = false) {
      router.navigate(routeId, back);
    },
    reset() {
      mode = "create";
      selectedCloudId = null;
      phoneName = "";
      pinCode = "";
      router.reset();
    },
  };
}

export type SetupApp = ReturnType<typeof createSetupApp>;

const setupAppContextKey = Symbol("setup-app");

export function provideSetupApp(options: CreateSetupAppOptions) {
  const setupApp = createSetupApp(options);
  setContext(setupAppContextKey, setupApp);
  return setupApp;
}

export function useSetupApp() {
  return getContext<SetupApp>(setupAppContextKey);
}
