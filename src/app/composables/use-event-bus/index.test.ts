import mitt from "mitt";
import { useEventBus } from "./index";

const onMock = vi.fn();
const emitMock = vi.fn();
vi.mock("mitt", () => ({
    default: vi.fn(() => ({
        on: onMock,
        emit: emitMock,
    })),
}));

describe("Composable - useEventBus", () => {
    it("should create event", () => {
        const event = useEventBus("test-event");
        expect(mitt).toHaveBeenCalledOnce();
        expect(event.on).toBeInstanceOf(Function);
        expect(event.emit).toBeInstanceOf(Function);
    });

    it("should register an event when on is called", () => {
        const event = useEventBus("test-event");
        event.on(vi.fn);
        expect(onMock).toHaveBeenCalledOnce();
    });
    it("should emit an event when emit is called", () => {
        const event = useEventBus("test-event");
        const callback = vi.fn();
        emitMock.mockImplementation((key, payload) => callback(payload));
        event.on(callback);
        event.emit({});
        expect(emitMock).toHaveBeenCalledOnce();
        expect(emitMock).toHaveBeenCalledWith("test-event", {});
        expect(callback).toHaveBeenCalledOnce();
    });
});
