/// <reference types="unplugin-icons/types/vue" />

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
