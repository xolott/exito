import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import pages from "vite-plugin-pages";
import svg from "vite-svg-loader";
import { resolve } from "path";
import icons from "unplugin-icons/vite";

console.log(process.env.ELECTRON ? "./" : ".");
export default defineConfig({
    base: process.env.ELECTRON ? "./" : "./",

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
});
