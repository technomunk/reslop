import { defineConfig } from "vitest/config";

// Separate from vite.config.ts, whose root is src/web; tests live next to code in all of src/.
export default defineConfig({
  test: {
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
