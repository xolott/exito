import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import initializePlugins from "@/app/plugins";
import { initializeFeaturesLayer } from "@/infrastructure";

function initialize() {
    const app = createApp(App);
    initializeFeaturesLayer();
    initializePlugins(app);
    app.mount("#app");
}

initialize();
