const { contextBridge, ipcRenderer } = require("electron");
const { events } = require("./constants");

window.addEventListener("DOMContentLoaded", () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (!element) return;
        element.innerText = text;
    };
    ["chrome", "node", "electron"].forEach((dependency) => {
        replaceText(`${dependency}-version`, process.versions[dependency]);
    });
});

function isChannelValid(channels, channel) {
    if (!channels.includes(channel)) {
        console.warn(`Invalid channel ${channel}`);
        return false;
    }
    return true;
}

contextBridge.exposeInMainWorld("electron", {
    send: (channel, data) => {
        isChannelValid(Object.values(events.clientToServer), channel) && ipcRenderer.send(channel, data);
    },

    receive: (channel, func) => {
        isChannelValid(Object.values(events.clientToServer), channel) && ipcRenderer.on(channel, func);
    },
});
