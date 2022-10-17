export enum ClientEvents {
    WINDOW_MAXIMIZE = "window:maximize",
    WINDOW_MINIMIZE = "window:minimize",
    WINDOW_CLOSE = "window:close",
    WINDOW_MAX_UNMAX = "window:maxUnmax",
    WINDOW_UNMAXIMIZE = "window:unmaximize",
    //
    STORAGE_GET = "storage:get",
    STORAGE_SET = "storage:set",
    STORAGE_DELETE = "storage:delete",
    STORAGE_DID_CHANGE_REGISTER = "storage:did-change-register",
}

export enum ServerEvents {
    STORAGE_DID_CHANGE_EVENT = "storage:did-change-event",
}
