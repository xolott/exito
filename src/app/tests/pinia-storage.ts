import { MaybeComputedRef, RemovableRef } from "@vueuse/core";
import { ref } from "vue";

export function mockedPiniaStorage<T>(initialValue: MaybeComputedRef<T>) {
    return ref(initialValue) as RemovableRef<T>;
}
