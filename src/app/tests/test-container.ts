import { Settings } from "../../models/settings";
import { MODEL_TYPES } from "../../models";
import { iocContainer } from "../../core/ioc-container";

export function initializeTestContainer(override?: Partial<Settings>) {
    iocContainer.isBound(MODEL_TYPES.Settings) && iocContainer.unbind(MODEL_TYPES.Settings);

    iocContainer.bind<Settings>(MODEL_TYPES.Settings).toConstantValue({
        isDev: false,
        isElectron: true,
        isTest: true,
        isWindows: false,
        isMac: false,
        isBrowser: false,
        ...override,
    });
}
