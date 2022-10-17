import { App, Component, createApp } from "vue";
import random from "@/core/random";
import { createElement, getModalContainer } from "@/app/composables/use-modal/document-utils";
import { transformUserEvents } from "@/app/composables/use-modal/component-utils";

interface UseModalOptions {
    containerId?: string;
}

interface UseModalShowOptions {
    props?: Record<string, unknown>;
    events?: Record<string, unknown>;
}

interface UseModal<T> {
    id: string;
    show: (options?: UseModalShowOptions) => Promise<T | undefined>;
}

export class InvalidUseModalContainerError extends Error {
    constructor(selector: string) {
        super(`Invalid container selector: ${selector}`);
    }
}

export interface ModalEvents<T> {
    (event: "close", payload?: T | undefined): void;
    (event: "success", payload?: T | undefined): void;
}

const DEFAULT_CONTAINER_ID = "app";

export function useModal<T = unknown>(component: Component, options?: UseModalOptions): UseModal<T> {
    const containerId = options?.containerId || DEFAULT_CONTAINER_ID;
    const modalContainer = getModalContainer(containerId);
    const modalId = "modal-" + random.cssId();
    return {
        id: modalId,
        show: async (options?: UseModalShowOptions) => {
            const container = createElement("div", { id: modalId });
            modalContainer.appendChild(container);
            return new Promise<T | undefined>((resolve) => {
                const disposeModal = (instance: App) => {
                    container.parentNode?.removeChild(container);
                    instance.unmount();
                };

                const modalInstance = createApp(component, {
                    ...options?.props,
                    onClose($event: T | undefined) {
                        disposeModal(modalInstance);
                        resolve($event);
                    },
                    onSuccess($event: T) {
                        disposeModal(modalInstance);
                        resolve($event);
                    },
                    ...transformUserEvents(options?.events),
                });

                modalInstance.mount(container);
            });
        },
    };
}
