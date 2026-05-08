import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
      $apps: path.resolve("./src/apps"),
      $phone: path.resolve("./src/phone"),
      "~": path.resolve("../"),
      "@common": path.resolve("../src/common/"),
    },
  },
  build: {
    outDir: "../web/build",
    emptyOutDir: true,
    target: "es2023",
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
    },
  },
  plugins: [svelte(), tailwindcss()],
});
