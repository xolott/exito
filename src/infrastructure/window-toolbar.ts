import { ClientEvents } from "@/core/constants";

class WindowToolbarManager {
    minimizeWindow() {
        window.electron.send(ClientEvents.WINDOW_MINIMIZE);
    }

    maximizeWindow() {
        window.electron.send(ClientEvents.WINDOW_MAXIMIZE);
    }

    unmaximizeWindow() {
        window.electron.send(ClientEvents.WINDOW_UNMAXIMIZE);
    }

    maxUnmaxWindow() {
        window.electron.send(ClientEvents.WINDOW_MAX_UNMAX);
    }

    closeWindow() {
        window.electron.send(ClientEvents.WINDOW_CLOSE);
    }
}

export const WindowToolbar = new WindowToolbarManager();
