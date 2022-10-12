/// <reference types="unplugin-icons/types/vue" />
/// <reference types="vitest" />

import type { ViteHotContext } from "vite/types/hot";

interface ImportMetaEnv {
    readonly IS_DEV: boolean;
}

export interface ImportMeta {
    readonly env: ImportMetaEnv;
    readonly hot?: ViteHotContext;
}
export interface ImportMetaHMR {
    readonly hot?: ViteHotContext;
}

declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, never>;
    export default component;
}

declare module "~icons/*" {
    import { FunctionalComponent, SVGAttributes } from "vue";
    const component: FunctionalComponent<SVGAttributes>;
    export default component;
}
