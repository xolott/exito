import { useGithubServerGlobalWatcher } from "@/app/composables/use-github-server/watcher";

export function initializeGlobalWatchers() {
    useGithubServerGlobalWatcher();
}
