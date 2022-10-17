import { useElectronStorage, useInjectable } from "@/app/composables";
import { MODEL_TYPES } from "@/models";
import { Settings } from "@/models/settings";
import { useStorage } from "@vueuse/core";

export function useConditionalStorage<T extends string | number | boolean | object | null>(
    key: string,
    defaultValue: T,
) {
    const settings = useInjectable<Settings>(MODEL_TYPES.Settings);
    if (settings.isTest || settings.isElectron) return useElectronStorage<T>(key, defaultValue);
    return useStorage<T>(key, defaultValue);
}
