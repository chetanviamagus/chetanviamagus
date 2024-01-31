import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import "dotenv/config";
// require("dotenv").config();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      action: resolve(__dirname, "src/action"),
      asset: resolve(__dirname, "src/asset"),
      component: resolve(__dirname, "src/component"),
      layout: resolve(__dirname, "src/layout"),
      hoc: resolve(__dirname, "src/hoc"),
      hook: resolve(__dirname, "src/hook"),
      i18n: resolve(__dirname, "src/i18n"),
      lang: resolve(__dirname, "src/lang"),
      locale: resolve(__dirname, "src/locale"),
      routes: resolve(__dirname, "src/routes"),
      service: resolve(__dirname, "src/service"),
      util: resolve(__dirname, "src/util"),
      view: resolve(__dirname, "src/view"),
      reducer: resolve(__dirname, "src/reducer"),
      slice: resolve(__dirname, "src/slice"),
      controller: resolve(__dirname, "src/controller"),
      model: resolve(__dirname, "src/model"),
      poc: resolve(__dirname, "src/poc"),
    },
  },
  build: {
    outDir: "build",
    sourcemap: process.env.VITE_GENERATE_SOURCEMAP === "true",
    chunkSizeWarningLimit: 10000,
  },
  server: {
    port: parseInt(process.env.VITE_PORT || "3000"),
    proxy: {
      "/api-server/": "...",
      "/authorization/": "...",
    },
  },
  css: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
});
