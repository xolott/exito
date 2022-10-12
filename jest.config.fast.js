const baseConfig = require("./jest.config");

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    ...baseConfig,
    transform: {
        "^.+\\.(t|j)sx?$": "@swc/jest",
        "^.+\\.vue$": "@vue/vue3-jest",
    },
};
