import { App } from "vue";
import initializeStore from "@/app/plugins/store";
import initializeRouter from "@/app/plugins/router";

export default function initializePlugins(app: App) {
    initializeRouter(app);
    initializeStore(app);
}
