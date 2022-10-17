import { useGithubServer } from "@/app/composables";
import { useSessionStore } from "@/app/plugins/store/modules/session";
import { useUserSettingsStore } from "@/app/plugins/store/modules/user-settings";
import { watch } from "vue";
import { throwGlobal, GlobalErrorMessage } from "@/app/plugins/error-handler";

export function useGithubServerGlobalWatcher() {
    const githubServer = useGithubServer();
    const sessionStore = useSessionStore();
    const settingsStore = useUserSettingsStore();
    watch(
        githubServer,
        async () => {
            try {
                const userInfo = await githubServer.value?.getUserInfo();
                sessionStore.setUserInfo(userInfo ?? null);
            } catch (error) {
                throwGlobal(new GlobalErrorMessage(error as Error, "Github"));
                settingsStore.updateGithubSettings({ apiKey: null });
            }
        },
        { immediate: true },
    );
}
