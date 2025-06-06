import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5001",
        rewrite: (path) => path.replace(/^\/api/, ""),
        changeOrigin: true,
      },
    },
    host: "0.0.0.0",
  },
  preview: {
    host: "0.0.0.0",
    port: 8000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.endsWith("src/shared/model/config.ts")) {
            return "env";
          }

          return null;
        },
      },
    },
  },
});
