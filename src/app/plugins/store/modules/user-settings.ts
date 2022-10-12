import { acceptHMRUpdate, defineStore } from "pinia";
import { useElectronStore } from "@/app/plugins/store/composites/use-electron-store";
import type { ImportMetaHMR } from "@/vite-env";

export const useUserSettingsStore = defineStore({
    id: "userSettingsStore",
    state: () => ({
        github: useElectronStore<string | null>("github", null),
        linear: useElectronStore<string | null>("linear", null),
    }),
});

(import.meta as ImportMetaHMR).hot?.accept(acceptHMRUpdate(useUserSettingsStore, (import.meta as ImportMetaHMR).hot));
