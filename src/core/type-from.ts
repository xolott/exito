import _ from "lodash";

// eslint-disable-next-line @typescript-eslint/ban-types
function funcName(func: Function) {
    if (func.name) return func.name;

    const match = /^\s*function\s*([^(\s]+)/i.exec(func.toString());
    return match ? match[1] : "";
}

function ctorName(val: unknown) {
    const strName = Object.prototype.toString.call(val).slice(8, -1);
    if ((strName === "Object" || strName === "Error") && (val as object).constructor)
        return funcName((val as object).constructor);
    return strName;
}

export default function typeFrom(val: unknown) {
    if (_.isNull(val)) return "null";
    if (_.isUndefined(val)) return "undefined";
    const type = typeof val;
    return type === "object" ? ctorName(val) : type;
}
