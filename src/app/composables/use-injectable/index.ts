import { Container } from "inversify";
import { iocContainer } from "@/core/ioc-container";
import { Settings } from "@/models/settings";
import { MODEL_TYPES } from "@/models";

export function useInjectable<T>(symbol: symbol, container?: Container): T {
    container = container ?? iocContainer;
    return container.get<T>(symbol);
}

export function useSettings(container?: Container): Settings {
    return useInjectable<Settings>(MODEL_TYPES.Settings, container);
}
