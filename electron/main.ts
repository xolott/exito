import { app, BrowserWindow, session } from "electron";
import OS from "./os";
import Window from "./window";
import Storage from "./storage";

app.whenReady().then(() => {
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
                ...details.responseHeaders,
                "Content-Security-Policy": [
                    "default-src 'self' 'unsafe-inline' https://api.github.com/graphql https://avatars.githubusercontent.com",
                ],
            },
        });
    });
    Window.create();
    Storage.initialize();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length) return;
        Window.create();
        Storage.initialize();
    });
});
app.on("window-all-closed", () => {
    if (OS.isMac) return;
    app.quit();
});
