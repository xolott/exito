import { MaybeComputedRef, pausableWatch, RemovableRef, resolveUnref } from "@vueuse/core";
import { ref } from "vue";
import _ from "lodash";
import { ElectronStore } from "./electron-store";
type OnDidChangeCallback = <T>(newValue: unknown, oldValue: unknown) => T;

interface UseElectronStoreOptions {
    flush?: "pre" | "post" | "sync";
    deep?: boolean;
    listenToStorageChanges?: boolean;
    writeDefaults?: boolean;
    mergeDefaults?: boolean;
    onError?: (e: Error | unknown) => void;
    storage?: ElectronStore;
}

let electronStore: ElectronStore | null = null;

function getStore() {
    if (!electronStore) electronStore = new ElectronStore();
    return electronStore;
}

export function useElectronStorage<T extends string | number | boolean | object | null>(
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

    listenToStorageChanges && _storage.onDidChange(key, update as OnDidChangeCallback);
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
            // TODO: wait for a fix to remove the c8 ignore comment. https://github.com/bcoe/c8/issues/229#issuecomment-1277999927
            /* c8 ignore next */
        } finally {
            resumeWatch();
        }
    }

    function update(newValue?: T) {
        data.value = read(newValue);
    }
}
