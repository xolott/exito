import { App } from "vue";

declare global {
    interface Window {
        App: App;
    }
}
