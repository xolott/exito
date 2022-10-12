import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { useUserSettingsStore } from "./user-settings";

describe("User Settings Store", () => {
    beforeEach(() => {
        const pinia = createTestingPinia({
            initialState: {},
        });
        setActivePinia(pinia);
    });

    it("github - initialize settings", () => {
        useUserSettingsStore.$id;
        console.log(useUserSettingsStore.$id);
    });
});
