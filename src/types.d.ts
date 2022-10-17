import { ClientEvents, ServerEvents } from "@/core/constants";

export {};

interface ElectronClient {
    send(channel: ClientEvents, ...data: unknown[]);
    get(channel: ClientEvents, ...data: unknown[]): unknown;
    on(channel: ServerEvents, callback: EventListenerCallback);
}

declare global {
    interface Window {
        electron: ElectronClient;
    }
}

export type Dictionary<T> = Record<string, T>;
