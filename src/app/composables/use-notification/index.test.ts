import { NotificationType, useNotification } from "./index";
import { expect } from "vitest";
import { useEventBus } from "../use-event-bus";

const onMock = vi.fn();
const emitMock = vi.fn();
vi.mock("../use-event-bus", () => {
    return {
        useEventBus: vi.fn(() => ({
            on: onMock,
            emit: emitMock,
        })),
    };
});

describe("Composable - useNotification", () => {
    it("should return required functions", () => {
        const notification = useNotification();
        expect(useEventBus).toHaveBeenCalledOnce();
        expect(notification).toBeInstanceOf(Object);
        expect(notification.on).toBeInstanceOf(Function);
        expect(notification.info).toBeInstanceOf(Function);
        expect(notification.success).toBeInstanceOf(Function);
        expect(notification.warn).toBeInstanceOf(Function);
        expect(notification.error).toBeInstanceOf(Function);
    });

    it("should emit events with defined type", () => {
        const notify = useNotification();
        notify.info({ title: "info" });
        expect(emitMock).toHaveBeenCalledWith({ type: NotificationType.INFO, title: "info" });
        notify.success({ title: "success" });
        expect(emitMock).toHaveBeenCalledWith({ type: NotificationType.SUCCESS, title: "success" });
        notify.warn({ title: "warn" });
        expect(emitMock).toHaveBeenCalledWith({ type: NotificationType.WARNING, title: "warn" });
        notify.error({ title: "error", description: "error-description" });
        expect(emitMock).toHaveBeenCalledWith({
            type: NotificationType.ERROR,
            title: "error",
            description: "error-description",
        });
    });
});
