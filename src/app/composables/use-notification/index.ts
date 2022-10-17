import { useEventBus } from "@/app/composables/use-event-bus";

export enum NotificationType {
    INFO = "notification:info",
    SUCCESS = "notification:success",
    WARNING = "notification:warn",
    ERROR = "notification:error",
}

interface NotificationPayload {
    title: string;
    description?: string;
    timeout?: number;
}
export interface NotificationEvent extends NotificationPayload {
    type: NotificationType;
}

export function useNotification() {
    const eventBus = useEventBus<NotificationEvent>("notification");
    return {
        on: eventBus.on,
        info(payload: NotificationPayload) {
            eventBus.emit({
                type: NotificationType.INFO,
                ...payload,
            });
        },
        success(payload: NotificationPayload) {
            eventBus.emit({
                type: NotificationType.SUCCESS,
                ...payload,
            });
        },
        warn(payload: NotificationPayload) {
            eventBus.emit({
                type: NotificationType.WARNING,
                ...payload,
            });
        },
        error(payload: NotificationPayload) {
            eventBus.emit({
                type: NotificationType.ERROR,
                ...payload,
            });
        },
    };
}
