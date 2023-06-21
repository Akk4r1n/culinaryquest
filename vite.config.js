/** @type {import('vite').UserConfig} */

import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    root: "src",
    server: {
        host: "0.0.0.0",
    },
    build: {
        outDir: "dist",
        assetsDir: "assets",
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/index.html"),
                search: resolve(__dirname, "src/search/index.html"),
                recipe: resolve(__dirname, "src/recipe/index.html"),
            },
        },
    },
});