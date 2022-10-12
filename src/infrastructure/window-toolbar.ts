class WindowToolbarManager {
    minimizeWindow() {
        window.electron.send("window:minimize");
    }

    maximizeWindow() {
        window.electron.send("window:maximize");
    }

    unmaximizeWindow() {
        window.electron.send("window:unmaximize");
    }

    maxUnmaxWindow() {
        window.electron.send("window:maxUnmax");
    }

    closeWindow() {
        window.electron.send("window:close");
    }
}

export const WindowToolbar = new WindowToolbarManager();
