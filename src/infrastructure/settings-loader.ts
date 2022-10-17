import type { Settings as SettingsInterface } from "@/models/settings";
import { injectable } from "inversify";
import _ from "lodash";

interface ImportMetaEnv {
    readonly IS_DEV: boolean;
    readonly VITE_IS_TEST: boolean;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

@injectable()
export class SettingsLoader implements SettingsInterface {
    isDev: boolean;
    isElectron: boolean;
    isMac: boolean;
    isWindows: boolean;
    isTest: boolean;
    isBrowser: boolean;

    constructor() {
        const process = this.getProcess();
        this.isDev = !!process.env.IS_DEV;
        this.isTest = !!process.env.VITE_IS_TEST;
        this.isElectron = _.has(window, "electron");
        this.isBrowser = !this.isTest && !this.isElectron;
        this.isMac = process.platform === "darwin";
        this.isWindows = process.platform === "win32";
    }

    getProcess() {
        try {
            return process;
        } catch {
            return {
                env: (import.meta as unknown as ImportMeta).env,
                platform: "browser",
            };
        }
    }
}
