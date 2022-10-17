/**
 * @vitest-environment jsdom
 */

import { mountWithPinia } from "../../tests/pinia-store";
import GithubSettings from "./github-settings.vue";
import { useUserSettingsStore } from "../../plugins/store/modules/user-settings";
import { nextTwoTick } from "../../tests/next-tick";
import { initializeTestContainer } from "../../tests/test-container";

vi.mock("@/app/composables/use-electron-storage/electron-store");
vi.mock("@/app/composables/use-modal", () => ({
    useModal: vi.fn(() => ({ show: vi.fn() })),
}));

const TOKEN_SPAN_SELECTOR = "[data-test-id=github-settings-token]";

describe("Component - GithubSettings", () => {
    beforeEach(() => {
        initializeTestContainer();
    });

    it("should be rendered", async () => {
        const component = mountWithPinia(GithubSettings);
        await nextTwoTick();
        expect(component.find(TOKEN_SPAN_SELECTOR).exists()).toBeFalsy();
    });

    it("token field shouldn be rendered when the token is updated", async () => {
        const component = mountWithPinia(GithubSettings, { stubActions: false });
        await nextTwoTick();
        const store = useUserSettingsStore();
        expect(component).toBeInstanceOf(Object);
        expect(component.find(TOKEN_SPAN_SELECTOR).exists()).toBeFalsy();

        const apiKey = "123";
        store.updateGithubSettings({ apiKey });

        await nextTwoTick();
        const span = component.find(TOKEN_SPAN_SELECTOR);
        expect(span.exists()).toBeTruthy();
        expect(span.text()).toBe("***");
    });
});
