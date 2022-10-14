import type { Settings as SettingsInterface } from "@/models/settings";
import { injectable } from "inversify";

interface ImportMetaEnv {
    readonly IS_DEV: boolean;
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

    constructor() {
        const process = this.getProcess();
        this.isDev = !!process.env.IS_DEV;
        this.isElectron = !!window.electron;
        this.isMac = process.platform === "darwin";
        this.isWindows = process.platform === "win32";
        console.log(this);
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
