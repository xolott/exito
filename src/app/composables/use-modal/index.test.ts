/**
 * @vitest-environment happy-dom
 */

/* eslint-disable vue/one-component-per-file */

import { defineComponent, h } from "vue";
import { nextTwoTick } from "../../tests/next-tick";
import { InvalidUseModalContainerError, useModal } from "./index";

describe("Composable - useModal", () => {
    const testComponentId = "test-id";
    const testComponent = defineComponent({
        props: [],
        emits: ["success", "close", "custom-event"],
        setup(props, { emit }) {
            return () => {
                emit("custom-event", true);
                return h("div", {
                    id: testComponentId,
                    onClick() {
                        emit("close");
                    },
                    onFocus() {
                        emit("success", true);
                    },
                });
            };
        },
    });

    beforeEach(() => {
        const body = document.querySelector("body");
        if (!body) throw new Error("No Body found");
        body.childNodes.forEach((node) => body.removeChild(node));
        body.innerHTML = '<div id="app"></div>';
    });

    it("should fails whe the parent-container doesn't exists", async () => {
        expect(() => useModal<boolean>(testComponent, { containerId: "#id" })).toThrowError(
            InvalidUseModalContainerError,
        );
    });

    it("should mount the component when required", async () => {
        const { id, show } = useModal(testComponent);
        const elementBefore = document.getElementById(id);
        expect(elementBefore).toBeNull();

        show();
        await nextTwoTick();
        const elementAfter = document.getElementById(id);
        expect(elementAfter).toBeTruthy();
    });

    it("should close the modal when the close event is emitted from the component", async () => {
        const { id, show } = useModal<boolean>(testComponent);
        const elementBefore = document.getElementById(id);
        expect(elementBefore).toBeNull();

        const modal = show();
        await nextTwoTick();

        const elementAfter = document.getElementById(id);
        expect(elementAfter).toBeTruthy();

        const testComponentElement = document.getElementById(testComponentId);
        expect(testComponentElement).toBeTruthy();
        testComponentElement?.click();

        await nextTwoTick();

        expect(modal).resolves.toBeUndefined();
    });

    it("should dispose the modal after close", async () => {
        const { id, show } = useModal<boolean>(testComponent);

        const modal = show();
        await nextTwoTick();

        const testComponentElement = document.getElementById(testComponentId);
        testComponentElement?.click();
        await nextTwoTick();

        const elementAfter = document.getElementById(id);
        expect(elementAfter).toBeNull();

        await nextTwoTick();

        expect(modal).resolves.toBeUndefined();
    });

    it("should dispose the modal after success", async () => {
        const { id, show } = useModal<boolean>(testComponent, {});

        const modal = show();
        await nextTwoTick();

        const testComponentElement = document.getElementById(testComponentId);
        testComponentElement?.focus();
        await nextTwoTick();

        const elementAfter = document.getElementById(id);
        expect(elementAfter).toBeNull();

        await nextTwoTick();

        expect(modal).resolves.toBe(true);
    });

    it("should always exists one modal container", async () => {
        useModal<boolean>(testComponent);
        useModal<boolean>(testComponent);
        useModal<boolean>(testComponent);

        await nextTwoTick();

        const modalContainer = document.querySelectorAll("#modal-container");

        expect(modalContainer).toBeTruthy();
        expect(modalContainer.length).toBe(1);
    });

    it("should emit custom events", async () => {
        const eventListener = vi.fn();
        const { show } = useModal<boolean>(testComponent);

        show({
            events: {
                "custom-event": eventListener,
            },
        });
        await nextTwoTick();

        expect(eventListener).toHaveBeenCalledOnce();
        expect(eventListener).toHaveBeenCalledWith(true);
    });
});
