/**
 * @vitest-environment happy-dom
 */

import { mountWithPinia } from "../../tests/pinia-store";
import GithubSettings from "./github-settings.vue";
import { useUserSettingsStore } from "../../plugins/store/modules/user-settings";
import { nextTwoTick } from "../../tests/next-tick";

vi.mock("@/app/composables/use-electron-storage/electron-store");

const TOKEN_SPAN_SELECTOR = "[data-test-id=github-settings-token]";
describe("Component - GithubSettings", () => {
    it("should be rendered", () => {
        const component = mountWithPinia(GithubSettings);
        expect(component).toBeDefined();
        component.find(TOKEN_SPAN_SELECTOR);
    });

    it("token field shouldn be rendered when the token is updated", async () => {
        const component = mountWithPinia(GithubSettings, { stubActions: false });
        const store = useUserSettingsStore();
        expect(component).toBeDefined();
        expect(component.find(TOKEN_SPAN_SELECTOR).exists()).toBeFalsy();

        const apiKey = "123";
        store.updateGithubSettings({ apiKey });

        await nextTwoTick();
        const span = component.find(TOKEN_SPAN_SELECTOR);
        expect(span.exists()).toBeTruthy();
        expect(span.text()).toBe("***");
    });
});
