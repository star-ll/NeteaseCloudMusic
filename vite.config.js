import { defineConfig } from "vite";
import "path";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	mode: "development",
	server: {
		host: "127.0.0.1",
		port: "3002",
		proxy: {
			"^/api": {
				target:
					"https://netease-cloud-music-api-peach-five.vercel.app/",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
	resolve: {
		alias: {
			"@": path.join(__dirname, "./src/"),
		},
	},
	plugins: [react()],
});
