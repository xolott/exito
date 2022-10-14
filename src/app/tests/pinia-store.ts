import { createTestingPinia, TestingOptions } from "@pinia/testing";
import { useUserSettingsStore } from "@/app/plugins/store/modules/user-settings";
import { mockedPiniaStorage } from "./pinia-storage";
import {
    GithubUserSettings,
    LinearUserSettings,
    UserSettingsState,
} from "@/app/plugins/store/modules/user-settings/state";
import { setActivePinia } from "pinia";
import { mount } from "@vue/test-utils";

function createPiniaTesting(options?: TestingOptions) {
    return createTestingPinia({
        initialState: {
            [useUserSettingsStore.$id]: {
                github: mockedPiniaStorage<GithubUserSettings | null>(null),
                linear: mockedPiniaStorage<LinearUserSettings | null>(null),
            } as UserSettingsState,
        },
        ...options,
    });
}
export function preparePiniaStore(options?: TestingOptions) {
    setActivePinia(createPiniaTesting(options));
}

export function mountWithPinia(component: object, options?: TestingOptions) {
    return mount(component, {
        global: {
            plugins: [createPiniaTesting(options)],
        },
    });
}
