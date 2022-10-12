// eslint-disable @typescript-eslint/no-var-requires
const { app, BrowserWindow, session } = require("electron");
const { OS } = require("./os");
const { Window } = require("./window");

function initialize() {
    app.whenReady().then(() => {
        session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
            callback({
                responseHeaders: {
                    ...details.responseHeaders,
                    "Content-Security-Policy": ["default-src 'self' 'unsafe-inline'"],
                },
            });
        });
        Window.create();
        app.on("activate", () => {
            if (BrowserWindow.getAllWindows().length) return;
            Window.create();
        });
    });
    app.on("window-all-closed", () => {
        if (OS.isMac) return;
        app.quit();
    });
}

initialize();
