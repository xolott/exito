import type { Settings as SettingsInterface } from "@/models/Settings";

class SettingsLoader implements SettingsInterface {
    isDev: boolean;
    isElectron: boolean;
    isMac: boolean;
    isWindows: boolean;

    constructor() {
        const process = this.getProcess();
        this.isDev = !!process.env.IS_DEV;
        this.isElectron = !!window.electron;
        this.isMac = process.platform === "darwin";
        this.isWindows = process.platform === "win32";
    }

    getProcess() {
        try {
            return process;
        } catch {
            return {
                env: import.meta.env,
                platform: "browser",
            };
        }
    }
}

export const settings = new SettingsLoader();
