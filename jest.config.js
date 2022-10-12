/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    collectCoverage: true,
    coverageDirectory: ".coverage",
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: -10,
        },
    },
    transform: {
        "^.+\\.vue$": "@vue/vue3-jest",
    },
    moduleFileExtensions: ["json", "js", "jsx", "ts", "tsx", "vue"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    testPathIgnorePatterns: ["^.+\\.fixture.ts$"],
    coveragePathIgnorePatterns: ["^.+\\.fixture.ts$"],
};
