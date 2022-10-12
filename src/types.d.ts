export {};

interface ElectronClient {
    send(channel: string, data?: unknown);
}

declare global {
    interface Window {
        electron: ElectronClient;
    }
}
