/**@type {import('vite').UserConfig}  */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  //   mode: "production",
  //   mode: "development",
  server: {
    // host: "172.30.249.1",
    port: "3000",
    proxy: {
      "^/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@component": resolve(__dirname, "./src/components"),
    },
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  plugins: [react()],
});
