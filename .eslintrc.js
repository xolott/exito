module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        "plugin:vue/vue3-recommended",
        "eslint:recommended",
        "@vue/typescript/recommended",
        // Add under other rules
        "@vue/prettier",
    ],
    parserOptions: {
        ecmaVersion: 2021,
    },
    plugins: [],
    rules: {
        "vue/multi-word-component-names": 0,
        "@typescript-eslint/no-empty-interface": 0,
    },
};
