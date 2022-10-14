/// <reference types="unplugin-icons/types/vue" />
/// <reference types="vitest" />
/// <reference types="vite-plugin-pages/client" />

import type { ViteHotContext } from "vite/types/hot";

export interface ImportMetaHMR {
    readonly env: ImportMetaEnv;
    readonly hot?: ViteHotContext;
}

declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, never>;
    export default component;
}
