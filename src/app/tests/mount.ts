import { Component, createApp, defineComponent, h } from "vue";

type InstanceType<V> = V extends { new (...arg: unknown[]): infer X } ? X : never;
type VM<V> = InstanceType<V> & { unmount(): void };

function mount<V>(Comp: V) {
    const el = document.createElement("div");
    const app = createApp(Comp as Component);

    const unmount = () => app.unmount();
    const comp = app.mount(el) as unknown as VM<V>;
    comp.unmount = unmount;
    return comp;
}

export function useSetup<V>(setup: () => V) {
    const Comp = defineComponent({
        setup,
        render() {
            return h("div", []);
        },
    });

    return mount(Comp);
}
