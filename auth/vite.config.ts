import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./module": "./src/pages/sign-in/index.ts",
      },
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
  build: {
    target: "chrome89",
  },
});
