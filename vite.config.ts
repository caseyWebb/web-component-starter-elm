import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  build: {
    lib: {
      entry: "src/component.ts",
      name: "MyComponent",
      fileName: (format) =>
        `component.${format}.${format === "umd" ? "cjs" : "js"}`,
      formats: ["es", "umd"],
    },
  },
  test: {
    environment: "happy-dom", // or 'jsdom'
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ["src/**/*.ts"],
    }),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    eslint({
      include: ["src/**/*.ts", "spec/**/*.ts"],
    }),
  ],
});
