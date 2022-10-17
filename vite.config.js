/**@type {import('vite').UserConfig}  */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	base: "./",
	mode: "development",
	server: {
		host: "172.30.249.1",
		port: "3002",
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
			"@": path.join(__dirname, "./src/"),
			"@component": path.join(__dirname, "./src/components"),
		},
		extensions: [".tsx", ".ts", ".js", ".jsx"],
	},
	plugins: [react()],
});
