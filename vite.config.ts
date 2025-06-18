import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { federation } from "@module-federation/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteTsconfigPaths(),
    splitVendorChunkPlugin(),
    basicSsl(),
    federation({
      name: "host",
      remotes: {
        auth: {
          type: "module",
          name: "auth",
          entry: "https://localhost:5001/remoteEntry.js",
        },
      },
      filename: "remoteEntry.js",
      shared: {
        react: {
          requiredVersion: "19.0.0",
          singleton: true,
        },
        "react-dom": {
          requiredVersion: "19.0.0",
          singleton: true,
        },
        "react-router-dom": {
          requiredVersion: "7.5.1",
          singleton: true,
        },
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:7000",
        changeOrigin: true,
      },
      host: "0.0.0.0",
    },
    https: true,
  },
  preview: {
    host: "0.0.0.0",
    port: 5001,
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
