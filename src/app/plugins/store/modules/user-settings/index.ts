import { defineStore } from "pinia";
import { useElectronStorage } from "@/app/composables/use-electron-storage";
import {
    GithubUserSettings,
    LinearUserSettings,
    UserSettingsState,
} from "@/app/plugins/store/modules/user-settings/state";
import { enableStoreHMR } from "@/app/plugins/store/utils";

export const useUserSettingsStore = defineStore({
    id: "userSettingsStore",
    state: (): UserSettingsState => {
        return {
            github: useElectronStorage<GithubUserSettings | null>("github", null),
            linear: useElectronStorage<LinearUserSettings | null>("linear", null),
        };
    },

    actions: {
        updateGithubSettings(settings?: GithubUserSettings | null) {
            this.github = settings;
        },

        patchGithubSettings(settings?: Partial<GithubUserSettings | null>) {
            if (!settings) return;

            if (!this.github) {
                this.github = settings;
                return;
            }

            this.github = { ...this.github, ...settings };
        },

        updateLinearSettings(settings?: LinearUserSettings | null) {
            this.linear = settings;
        },

        patchLinearSettings(settings?: Partial<LinearUserSettings | null>) {
            if (!settings) return;

            if (!this.linear) {
                this.linear = settings;
                return;
            }

            this.linear = { ...this.linear, ...settings };
        },
    },
});

/* c8 ignore next */
enableStoreHMR(useUserSettingsStore);
