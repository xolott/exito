import { defineStore } from "pinia";
import { GitUser } from "@/models/git-user";
import { enableStoreHMR } from "@/app/plugins/store/utils";

interface SessionStoreState {
    userInfo: GitUser | null;
}

export const useSessionStore = defineStore({
    id: "useSessionStore",
    state: (): SessionStoreState => ({
        userInfo: null,
    }),

    actions: {
        setUserInfo(val: GitUser | null) {
            this.userInfo = val;
        },
    },
});

/* c8 ignore next */
enableStoreHMR(useSessionStore);
