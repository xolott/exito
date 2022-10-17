import { ipcMain, IpcMainEvent } from "electron";
import { ClientEvents, ServerEvents } from "../src/core/constants";
import Store from "electron-store";

class Storage {
    private store: Store = new Store();

    initialize() {
        this.store = new Store();
        this.registerEvents();
    }

    registerEvents() {
        ipcMain.on(ClientEvents.STORAGE_GET, (event: IpcMainEvent, key: string) => this.get.call(this, event, key));
        ipcMain.on(ClientEvents.STORAGE_SET, (event: IpcMainEvent, key: string, value: unknown) =>
            this.set.call(this, event, key, value),
        );
        ipcMain.on(ClientEvents.STORAGE_DELETE, (event: IpcMainEvent, key: string) =>
            this.delete.call(this, event, key),
        );
        ipcMain.on(ClientEvents.STORAGE_DID_CHANGE_REGISTER, (event: IpcMainEvent, key: string) =>
            this.onDidChange.call(this, event, key),
        );
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
