import { MaybeComputedRef, pausableWatch, RemovableRef, resolveUnref } from "@vueuse/core";
import Store from "electron-store";
import { ref } from "vue";
import _ from "lodash";

interface UseElectronStoreOptions {
    flush?: "pre" | "post" | "sync";
    deep?: boolean;
    listenToStorageChanges?: boolean;
    writeDefaults?: boolean;
    mergeDefaults?: boolean;
    onError?: (e: Error | unknown) => void;
    storage?: Store;
}

let electronStore: Store | null = null;

function getStore() {
    if (!electronStore) electronStore = new Store();
    return electronStore;
}

export function useElectronStore<T extends string | number | boolean | object | null>(
    key: string,
    defaults: MaybeComputedRef<T>,
    options?: UseElectronStoreOptions,
): RemovableRef<T> {
    const {
        flush = "pre",
        deep = true,
        listenToStorageChanges = true,
        writeDefaults = true,
        mergeDefaults = false,
        storage,
        onError = (e: Error | unknown) => {
            throw e;
        },
    } = options || {};

    const data = ref(defaults) as RemovableRef<T>;
    const rawInit = resolveUnref(defaults);
    const _storage = storage ?? getStore();

    const { pause: pauseWatch, resume: resumeWatch } = pausableWatch(data, () => write(data.value), { flush, deep });

    listenToStorageChanges && _storage.onDidChange(key, update as (newValue: unknown) => T);
    update();

    return data;

    function write(v: unknown) {
        try {
            if (v === null) return _storage.delete(key);
            _storage.set(key, v);
        } catch (e) {
            onError(e);
        }
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    function read(newValue?: T): T {
        pauseWatch();
        try {
            const rawValue = newValue ?? (_storage.get(key) as T | undefined);
            if (_.isNil(rawValue)) {
                writeDefaults && !_.isNil(rawInit) && write(rawInit);
                return rawInit;
            }

            if (mergeDefaults && _.isObjectLike(rawInit)) {
                return _.defaults(rawValue, rawInit);
            }

            return rawValue;
        } catch (e) {
            onError(e);
        } finally {
            resumeWatch();
        }
    }

    function update(newValue?: T) {
        data.value = read(newValue);
    }
}
