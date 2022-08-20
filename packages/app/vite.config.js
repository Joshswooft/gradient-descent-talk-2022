// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import postcss from "./postcss.config.js";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte()],
  optimizeDeps: { exclude: ["svelte-navigator"] },
  css: {
    postcss,
  },
  build: {
    minify: "esbuild",
    target: "esnext",
    // rollupOptions: {
    //   input: {
    //     main: resolve(__dirname, "index.html"),
    //     basics: resolve(__dirname, "basics/index.html"),
    //     costfunction: resolve(__dirname, "costfunction/index.html"),
    //     gradientdescent: resolve(__dirname, "gradientdescent/index.html"),
    //   },
    // },
  },
});
