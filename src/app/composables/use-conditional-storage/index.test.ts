import { useElectronStorage } from "../use-electron-storage";
import { useStorage } from "@vueuse/core";
import { afterEach, MockInstance } from "vitest";
import { initializeTestContainer } from "../../tests/test-container";
import { useConditionalStorage } from "./index";

vi.mock("@vueuse/core");
vi.mock("../use-electron-storage");

describe("Composable - useConditionalStorage", () => {
    beforeEach(() => {
        (useElectronStorage as unknown as MockInstance).mockImplementation(() => vi.fn());
        (useStorage as unknown as MockInstance).mockImplementation(() => vi.fn());
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should return electron storage on test environment", () => {
        initializeTestContainer({ isTest: true, isElectron: false, isBrowser: false });
        useConditionalStorage("keu", null);
        expect(useElectronStorage).toHaveBeenCalledOnce();
        expect(useStorage).not.toHaveBeenCalledOnce();
    });

    it("should return electron storage on electron environment", () => {
        initializeTestContainer({ isTest: false, isElectron: true, isBrowser: false });
        useConditionalStorage("keu", null);
        expect(useElectronStorage).toHaveBeenCalledOnce();
        expect(useStorage).not.toHaveBeenCalledOnce();
    });

    it("should return local storage on browser environtment", () => {
        initializeTestContainer({ isTest: false, isElectron: false, isBrowser: true });
        useConditionalStorage("keu", null);
        expect(useElectronStorage).not.toHaveBeenCalledOnce();
        expect(useStorage).toHaveBeenCalledOnce();
    });
});
