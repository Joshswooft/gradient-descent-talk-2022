// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte()],
  optimizeDeps: {
    include: ["highlight.js", "highlight.js/lib/core"],
    exclude: ["svelte-navigator"],
  },
  build: {
    minify: "esbuild",
    target: "esnext",
  },
});
