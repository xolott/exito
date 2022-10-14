import { RemovableRef } from "@vueuse/core";

export interface GithubUserSettings {
    apiKey?: string;
}

export interface LinearUserSettings {
    apiKey?: string;
}

export interface UserSettingsState {
    github?: RemovableRef<GithubUserSettings | null>;
    linear?: RemovableRef<LinearUserSettings | null>;
}
