/// <reference types="vitest" />
import { defineConfig, UserConfigExport } from "vite";
import type { UserConfig as VitestUserConfigInterface } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import pages from "vite-plugin-pages";
import svg from "vite-svg-loader";
import { resolve } from "path";
import icons from "unplugin-icons/vite";

const viteConfig: UserConfigExport = {
    base: "./",

    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },

    plugins: [
        vue(),
        pages({
            dirs: "src/app/pages",
        }),
        icons({
            autoInstall: true,
        }),
        svg(),
    ],

    server: {
        port: 3000,
    },
};

const vitestConfig: VitestUserConfigInterface = {
    test: {
        globals: true,
    },
};
export default defineConfig({
    ...viteConfig,
    ...vitestConfig,
} as unknown as UserConfigExport);
