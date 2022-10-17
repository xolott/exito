import mitt, { Emitter, Handler } from "mitt";

let emitter: Emitter<Record<string, unknown>> | null = null;

export function useEventBus<T = unknown>(eventKey: string) {
    emitter = emitter ?? mitt();
    return {
        on(callback: Handler<T>) {
            emitter?.on<string>(eventKey, callback as Handler);
        },
        emit(payload: T) {
            emitter?.emit(eventKey, payload);
        },
    };
}
