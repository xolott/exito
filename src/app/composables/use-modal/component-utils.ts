import _ from "lodash";

export function transformUserEvents(userEvents?: Record<string, unknown>) {
    if (!userEvents) return;
    return Object.keys(userEvents).reduce((obj, key) => {
        obj["on" + _.capitalize(key)] = userEvents[key];
        return obj;
    }, {} as Record<string, unknown>);
}
