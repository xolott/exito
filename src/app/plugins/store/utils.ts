import { ImportMetaHMR } from "@/vite-env";
import { acceptHMRUpdate, StoreDefinition } from "pinia";

export function enableStoreHMR(store: StoreDefinition) {
    /* c8 ignore start */
    const meta = import.meta as unknown as ImportMetaHMR;
    meta.hot?.accept(acceptHMRUpdate(store, meta.hot));
    /* c8 ignore end */
}
