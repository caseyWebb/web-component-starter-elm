import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import eslint from "vite-plugin-eslint";
// import elmPlugin from "vite-plugin-elm";

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
  // @ts-expect-error This is used by vitest, but not defined in the vite types
  test: {
    environment: "happy-dom", // or 'jsdom'
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ["src/**/*.ts"],
    }),
    // elmPlugin(),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    eslint({
      include: ["src/**/*.ts", "spec/**/*.ts"],
    }),
  ],
});
