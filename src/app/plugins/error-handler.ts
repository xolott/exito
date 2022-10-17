import { App } from "vue";
import { useNotification } from "@/app/composables/use-notification";
import _ from "lodash";
import { InvalidTokenError } from "@/features/errors";

export class GlobalErrorMessage {
    service?: string;
    error: Error;
    constructor(error: Error, service?: string) {
        this.error = error;
        this.service = service;
    }
}

export function throwGlobal(message: GlobalErrorMessage) {
    if (!_.has(window, "App")) throw message.error;
    window.App.config.errorHandler && window.App.config.errorHandler(message, null, "");
}

export function initializeErrorHandler(app: App) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.config.errorHandler = (message: unknown, _, __) => {
        if (!(message instanceof GlobalErrorMessage)) throw message as Error;
        const notify = useNotification();
        if (message.error instanceof InvalidTokenError)
            return notify.error({
                title: `Invalid ${message.service} token`,
                description: `Please, add a new valid ${message.service} token`,
            });
        notify.error({ title: "Unhandled Errpo", description: message.error.message });
    };
}
