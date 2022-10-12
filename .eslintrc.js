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
    },
};

// module.exports = {
//     plugins: ["@typescript-eslint"],
//     env: {
//         node: true,
//     },
//     globals: {
//         defineProps: "readonly",
//         defineEmits: "readonly",
//         withDefaults: "readonly",
//     },
//     parser: "vue-eslint-parser",
//     parserOptions: { parser: "@typescript-eslint/parser" },
//     extends: [
//         "@vue/typescript/recommended",
//         "plugin:@typescript-eslint/recommended",
//         "plugin:vue/vue3-recommended",
//         "prettier",
//     ],
//     overrides: [
//         {
//             files: ["*.ts", "*.tsx"],
//             rules: {
//                 // The core 'no-unused-vars' rules (in the eslint:recommeded ruleset)
//                 // does not work with type definitions
//                 "no-unused-vars": "off",
//             },
//         },
//     ],
//     rules: {
//         semi: 1,
//         indent: ["warn", 4],
//     },
// };
