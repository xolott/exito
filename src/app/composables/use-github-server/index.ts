import { Ref, ref } from "vue";
import { Github } from "@/infrastructure/github";
import { useUserSettingsStore } from "@/app/plugins/store/modules/user-settings";

export function useGithubServer(): Ref<Github | null> {
    const userSettings = useUserSettingsStore();
    const createGithubServer = () => {
        try {
            return new Github(userSettings.github?.apiKey as string);
        } catch (e) {
            return null;
        }
    };
    const githubRef = ref(createGithubServer()) as Ref<Github | null>;

    userSettings.$subscribe(() => {
        githubRef.value = createGithubServer();
    });

    return githubRef;
}
