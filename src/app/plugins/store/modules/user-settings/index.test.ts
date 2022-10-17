import { useUserSettingsStore } from "./index";
import { preparePiniaStore } from "@/app/tests/pinia-store";
import { initializeTestContainer } from "../../../../tests/test-container";

vi.mock("@/app/composables/use-electron-storage/electron-store");

describe("User Settings Store", () => {
    beforeEach(() => {
        initializeTestContainer();
        preparePiniaStore({ stubActions: false });
    });

    it("should be initialized", () => {
        const store = useUserSettingsStore();
        expect(store.github).toBeNull();
        expect(store.linear).toBeNull();
    });

    it("patches github settings", () => {
        const store = useUserSettingsStore();
        expect(store.github).toEqual(null);

        store.patchGithubSettings(null);
        expect(store.github).toEqual(null);

        store.patchGithubSettings(undefined);
        expect(store.github).toEqual(null);

        store.patchGithubSettings({});
        expect(store.github).toEqual({});

        store.patchGithubSettings({ apiKey: "123" });
        expect(store.github).toEqual({ apiKey: "123" });

        store.patchGithubSettings(null);
        expect(store.github).toEqual({ apiKey: "123" });

        store.patchGithubSettings({});
        expect(store.github).toEqual({ apiKey: "123" });
    });

    it("updates github settings", () => {
        const store = useUserSettingsStore();
        expect(store.github).toEqual(null);

        store.updateGithubSettings({ apiKey: "123" });
        expect(store.github).toEqual({ apiKey: "123" });

        store.updateGithubSettings({});
        expect(store.github).toEqual({});

        store.updateGithubSettings(null);
        expect(store.github).toEqual(null);

        store.updateGithubSettings(undefined);
        expect(store.github).toEqual(undefined);
    });

    it("patches linear settings", () => {
        const store = useUserSettingsStore();
        expect(store.linear).toEqual(null);

        store.patchLinearSettings(null);
        expect(store.linear).toEqual(null);

        store.patchLinearSettings(undefined);
        expect(store.linear).toEqual(null);

        store.patchLinearSettings({});
        expect(store.linear).toEqual({});

        store.patchLinearSettings({ apiKey: "123" });
        expect(store.linear).toEqual({ apiKey: "123" });

        store.patchLinearSettings(null);
        expect(store.linear).toEqual({ apiKey: "123" });

        store.patchLinearSettings({});
        expect(store.linear).toEqual({ apiKey: "123" });
    });

    it("updates linear settings", () => {
        const store = useUserSettingsStore();
        expect(store.linear).toEqual(null);

        store.updateLinearSettings({ apiKey: "123" });
        expect(store.linear).toEqual({ apiKey: "123" });

        store.updateLinearSettings({});
        expect(store.linear).toEqual({});

        store.updateLinearSettings(null);
        expect(store.linear).toEqual(null);

        store.updateLinearSettings(undefined);
        expect(store.linear).toEqual(undefined);
    });
});
