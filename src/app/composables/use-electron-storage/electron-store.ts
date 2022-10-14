import type { IpcRendererEvent } from "electron";
import { ClientEvents, ServerEvents } from "@/core/constants";
import _ from "lodash";

export type OnDidChangeCallback = <T>(newValue: unknown, oldValue: unknown) => T;

// TODO: add unit testing using electron
/* c8 ignore start */
export class ElectronStore {
    private didChangeCallbacks: Record<string, Array<OnDidChangeCallback>> = {};
    private isActive = false;

    constructor() {
        if (!window.electron) {
            console.warn(
                "[Electron Store] The electron object couldn't be found in the windows object. Are you running this using electron?",
            );
            return;
        }
        this.isActive = true;
        window.electron.on(ServerEvents.STORAGE_DID_CHANGE_EVENT, this.didChangeHandle);
    }

    get(key: string): unknown {
        if (!this.isActive) return;
        return window.electron.get(ClientEvents.STORAGE_GET, key);
    }

    set(key: string, value: unknown) {
        if (!this.isActive) return;
        window.electron.send(ClientEvents.STORAGE_GET, key, value);
    }

    delete(key: string) {
        if (!this.isActive) return;
        window.electron.send(ClientEvents.STORAGE_DELETE, key);
    }

    onDidChange(key: string, callback: OnDidChangeCallback) {
        if (!this.isActive) return;
        window.electron.send(ClientEvents.STORAGE_DID_CHANGE_REGISTER, key);
        if (!Object.keys(this.didChangeCallbacks).includes(key)) this.didChangeCallbacks[key] = [];
        this.didChangeCallbacks[key].push(callback);
    }

    private didChangeHandle(__: IpcRendererEvent, key: string, newValue: unknown, oldValue: unknown) {
        if (!_.has(this.didChangeCallbacks, key)) return;
        this.didChangeCallbacks[key].forEach((callback) => callback(newValue, oldValue));
    }
}
/* c8 ignore stop */
