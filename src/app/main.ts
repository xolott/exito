import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import initializePlugins from "@/app/plugins";

function initialize() {
    const app = createApp(App);
    initializePlugins(app);
    app.mount("#app");
}

initialize();
