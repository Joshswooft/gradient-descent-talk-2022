// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

console.log(__dirname);

export default defineConfig({
  build: {
    minify: "esbuild",
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        basics: resolve(__dirname, "basics/index.html"),
        costfunction: resolve(__dirname, "costfunction/index.html"),
        gradientdescent: resolve(__dirname, "gradientdescent/index.html"),
      },
    },
  },
});
