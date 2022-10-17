import { InvalidUseModalContainerError } from "@/app/composables/use-modal/index";
import { Dictionary } from "@/types";

const DEFAULT_MODAL_CONTAINER_ID = "modal-container";

export function createElement(tag: string, attributes: Dictionary<string>) {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
    return element;
}

function createModalContainerElement(): HTMLElement {
    return createElement("div", { id: DEFAULT_MODAL_CONTAINER_ID });
}

function getParentContainer(parentId: string): HTMLElement {
    const parentContainer = document.getElementById(parentId);
    if (!parentContainer) throw new InvalidUseModalContainerError(parentId);
    return parentContainer;
}

export function getModalContainer(parentId: string) {
    const currentModalContainer = document.getElementById(DEFAULT_MODAL_CONTAINER_ID);
    if (currentModalContainer) return currentModalContainer;

    const parentContainer = getParentContainer(parentId);
    const modalContainer = createModalContainerElement();
    parentContainer.appendChild(modalContainer);
    return modalContainer;
}
