import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    assetsDir: "assets", // Папка, куда складываются CSS/JS
    outDir: "dist", // Итоговая папка билда
  },
  base: "/",
});
