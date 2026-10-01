/**
 * Builds a single self-contained HTML file of the homepage, for sharing the
 * prototype without deploying. Not used by the real Next.js site.
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import { fileURLToPath } from "node:url";

export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  plugins: [react(), viteSingleFile()],
  resolve: { alias: { "@": fileURLToPath(new URL("../src", import.meta.url)) } },
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  build: { outDir: "../preview-dist", emptyOutDir: true, assetsInlineLimit: 100000000 },
  logLevel: "warn",
});
