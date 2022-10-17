import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import initializePlugins from "@/app/plugins";
import { initializeFeaturesLayer } from "@/infrastructure";
import { setLocale } from "yup";
import { initializeErrorHandler } from "@/app/plugins/error-handler";

setLocale({
    mixed: {
        required: "This field is required",
    },
});

function initialize() {
    const app = createApp(App);
    initializeFeaturesLayer();
    initializePlugins(app);
    initializeErrorHandler(app);
    app.mount("#app");
    window.App = app;
}

initialize();
