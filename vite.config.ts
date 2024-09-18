import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import eslint from "vite-plugin-eslint";
import elmPlugin from "vite-plugin-elm";

export default defineConfig({
  build: {
    lib: {
      entry: "src/Component.ts",
      name: "MyComponent",
      fileName: (format) =>
        `Component.${format}.${format === "umd" ? "cjs" : "js"}`,
      formats: ["es", "umd"],
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ["src/**/*.ts"],
    }),
    elmPlugin(),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    eslint({
      include: ["src/**/*.ts"],
    }),
  ],
});
