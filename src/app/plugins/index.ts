import { App } from "vue";
import initializeStore from "@/app/plugins/store";
import initializeRouter from "@/app/plugins/router";
import { initializeGlobalWatchers } from "@/app/plugins/global-watcher";

export default function initializePlugins(app: App) {
    initializeRouter(app);
    initializeStore(app);
    initializeGlobalWatchers();
}
