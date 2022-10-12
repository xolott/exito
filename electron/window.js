const path = require("path");
const { BrowserWindow, ipcMain } = require("electron");
const { events } = require("./constants");
const isDev = !!process.env.IS_DEV;
const indexRoute = isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../dist/index.html")}`;

class Window {
    constructor() {
        /** @type {import('electron').BrowserWindowConstructorOptions} */
        this._options = {
            width: 1250,
            height: 900,
            titleBarStyle: "hidden",
            webPreferences: {
                preload: path.join(__dirname, "preload.js"),
                contextIsolation: true,
                sandbox: false,
                nodeIntegration: false,
            },
        };
    }

    create() {
        this.build();
        this.registerEvents();
    }

    build() {
        this._instance = new BrowserWindow(this._options);
        this._instance.loadURL(indexRoute);
        isDev && this._instance.webContents.openDevTools();
    }

    registerEvents() {
        ipcMain.on(events.clientToServer.WINDOW_MAXIMIZE, this.maximize);
        ipcMain.on(events.clientToServer.WINDOW_MINIMIZE, this.minimize);
        ipcMain.on(events.clientToServer.WINDOW_CLOSE, this.close);
        ipcMain.on(events.clientToServer.WINDOW_MAX_UNMAX, this.maxUnmax);
        ipcMain.on(events.clientToServer.WINDOW_UNMAXIMIZE, this.unmaximize);
    }

    get events() {
        return Object.keys(this._events);
    }

    minimize() {
        const window = BrowserWindow.getFocusedWindow();
        !!window.minimizable && window.minimize();
    }

    maximize() {
        const window = BrowserWindow.getFocusedWindow();
        !!window && window.maximizable && window.maximize();
    }
    unmaximize() {
        const window = BrowserWindow.getFocusedWindow();
        !!window && window.unmaximize();
    }
    maxUnmax() {
        const window = BrowserWindow.getFocusedWindow();
        !!window && window.isMaximized() ? window.unmaximize() : window.maximize();
    }
    close() {
        const window = BrowserWindow.getFocusedWindow();
        !!window && window.close();
    }
}

module.exports = {
    Window: new Window(),
};
