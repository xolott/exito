import path from "path";
import { BrowserWindow, ipcMain, BrowserWindowConstructorOptions } from "electron";
import { ClientEvents } from "../src/core/constants";

const isDev = !!process.env.IS_DEV;
const indexRoute = isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../dist/index.html")}`;

class Window {
    private readonly options: BrowserWindowConstructorOptions;
    private instance: BrowserWindow | null = null;
    constructor() {
        this.options = {
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
        this.instance = new BrowserWindow(this.options);
        this.instance.loadURL(indexRoute);
        isDev && this.instance.webContents.openDevTools();
    }

    registerEvents() {
        ipcMain.on(ClientEvents.WINDOW_MAXIMIZE, this.maximize);
        ipcMain.on(ClientEvents.WINDOW_MINIMIZE, this.minimize);
        ipcMain.on(ClientEvents.WINDOW_CLOSE, this.close);
        ipcMain.on(ClientEvents.WINDOW_MAX_UNMAX, this.maxUnmax);
        ipcMain.on(ClientEvents.WINDOW_UNMAXIMIZE, this.unmaximize);
    }

    minimize() {
        const window = BrowserWindow.getFocusedWindow();
        !!window?.minimizable && window.minimize();
    }

    maximize() {
        const window = BrowserWindow.getFocusedWindow();
        window?.maximizable && window.maximize();
    }
    unmaximize() {
        const window = BrowserWindow.getFocusedWindow();
        window?.unmaximize();
    }
    maxUnmax() {
        const window = BrowserWindow.getFocusedWindow();
        window?.isMaximized() ? window.unmaximize() : window?.maximize();
    }
    close() {
        const window = BrowserWindow.getFocusedWindow();
        window?.close();
    }
}

export default new Window();
