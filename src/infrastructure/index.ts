import { Settings } from "@/models/settings";
import { MODEL_TYPES } from "@/models";
import { SettingsLoader } from "@/infrastructure/settings-loader";
import { iocContainer } from "@/core/ioc-container";

export function initializeFeaturesLayer() {
    iocContainer.bind<Settings>(MODEL_TYPES.Settings).to(SettingsLoader).inSingletonScope();
}
