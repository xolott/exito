import { ipcMain, IpcMainEvent } from "electron";
import { ClientEvents, ServerEvents } from "../src/core/constants";
import Store from "electron-store";

class Storage {
    private readonly store: Store;
    constructor() {
        this.store = new Store();
    }

    initialize() {
        this.registerEvents();
    }

    registerEvents() {
        ipcMain.on(ClientEvents.STORAGE_GET, this.get);
        ipcMain.on(ClientEvents.STORAGE_SET, this.set);
        ipcMain.on(ClientEvents.STORAGE_DELETE, this.delete);
        ipcMain.on(ClientEvents.STORAGE_DID_CHANGE_REGISTER, this.onDidChange);
    }

    get(event: IpcMainEvent, key: string) {
        event.returnValue = this.store.get(key);
    }

    set(event: IpcMainEvent, key: string, value: unknown) {
        this.store.set(key, value);
    }

    delete(event: IpcMainEvent, key: string) {
        this.store.delete(key);
    }

    onDidChange(event: IpcMainEvent, key: string) {
        this.store.onDidChange(key, (newValue, oldValue) => {
            event.sender.send(ServerEvents.STORAGE_DID_CHANGE_EVENT, key, newValue, oldValue);
        });
    }
}

export default new Storage();
