import { RemovableRef } from "@vueuse/core";

export interface GithubUserSettings {
    apiKey?: string | undefined | null;
}

export interface LinearUserSettings {
    apiKey?: string | undefined | null;
}

export interface UserSettingsState {
    github?: RemovableRef<GithubUserSettings | null | undefined>;
    linear?: RemovableRef<LinearUserSettings | null | undefined>;
}
