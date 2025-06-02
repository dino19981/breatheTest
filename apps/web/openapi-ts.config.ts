import { defineConfig, defaultPlugins } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "./openapi.yaml",
  output: {
    path: "./api",
    case: "camelCase",
    clean: true,
    indexFile: true,
    tsConfigPath: "./tsconfig.json",
  },
  plugins: [
    ...defaultPlugins,
    "@hey-api/client-fetch",
    "@tanstack/react-query",
  ],
});
