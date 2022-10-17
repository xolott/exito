import { useGithubServer } from "./index";
import { useUserSettingsStore } from "../../plugins/store/modules/user-settings";
import { nextTwoTick } from "@/app/tests/next-tick";
import { preparePiniaStore } from "@/app/tests/pinia-store";
import { initializeTestContainer } from "../../tests/test-container";

vi.mock("@/app/composables/use-electron-storage/electron-store");

describe("Composable - useGithubServer", () => {
    beforeEach(() => {
        initializeTestContainer();
        preparePiniaStore({ stubActions: false });
    });

    it("should be null when no token is stored", () => {
        const githubServer = useGithubServer();
        expect(githubServer.value).toBe(null);
    });

    it("should be updated when the token is updated", async () => {
        const apiKey = "test-api-key";
        const store = useUserSettingsStore();
        const githubServer = useGithubServer();

        expect(githubServer.value).toBe(null);

        store.updateGithubSettings({ apiKey });
        await nextTwoTick();
        expect(githubServer.value).toBeInstanceOf(Object);
        expect(githubServer.value?.auth.httpHeader).toContain(apiKey);

        store.updateGithubSettings({});
        await nextTwoTick();
        expect(githubServer.value).toBe(null);

        store.updateGithubSettings(null);
        await nextTwoTick();
        expect(githubServer.value).toBe(null);
    });
});
