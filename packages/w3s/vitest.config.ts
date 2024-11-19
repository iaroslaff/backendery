import { mergeConfig } from "vite"
import { defineConfig } from "vitest/config"

import configure from "./vite.config"

export default mergeConfig(
  configure,
  defineConfig({
    test: {
      globals: true,
      setupFiles: "@testing-library/jest-dom",
      environment: "jsdom",
    },
  })
)
