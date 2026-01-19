import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.join(dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.spec.ts", "src/**/*.test.ts"],
    exclude: ["**/*.stories.*", "**/*.mdx", ".storybook/**"],
  },
});
