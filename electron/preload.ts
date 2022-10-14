import { contextBridge, ipcRenderer } from "electron";
import { ClientEvents, ServerEvents } from "../src/core/constants";

window.addEventListener("DOMContentLoaded", () => {
    const replaceText = (selector: string, text?: string) => {
        if (!text) return;
        const element = document.getElementById(selector);
        if (!element) return;
        element.innerText = text;
    };
    ["chrome", "node", "electron"].forEach((dependency) => {
        replaceText(`${dependency}-version`, process.versions[dependency]);
    });
});

type Channel = string;
type EventListenerCallback = (event: Electron.IpcRendererEvent, ...args: unknown[]) => void;

function isChannelValid(channels: Channel[], channel: Channel) {
    if (!channels.includes(channel)) {
        console.warn(`Invalid channel ${channel}`);
        return false;
    }
    return true;
}

contextBridge.exposeInMainWorld("electron", {
    send: (channel: ClientEvents, ...data: unknown[]) => {
        isChannelValid(Object.values(ClientEvents), channel) && ipcRenderer.send(channel, ...data);
    },

    get: (channel: ClientEvents, ...data: unknown[]) => {
        if (!isChannelValid(Object.values(ClientEvents), channel)) return;
        return ipcRenderer.sendSync(channel, ...data);
    },

    on(channel: ServerEvents, callback: EventListenerCallback) {
        if (!isChannelValid(Object.values(ServerEvents), channel)) return;
        ipcRenderer.on(channel, callback);
    },
});
