import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";
import { App } from "vue";

export default function initializeRouter(app: App) {
    const router = createRouter({
        history: createWebHistory(),
        routes,
    });
    app.use(router);
}
