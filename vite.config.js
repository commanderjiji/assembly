import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		watch: {
			usePolling: true, // <--- ADD THIS
		},
		host: true, // 👈 VERY IMPORTANT to allow access from outside
		port: 5173, // 👈 (or 5173 if you want, but let's do 3000 to match everything)
		strictPort: true, // 👈 optional, ensures it fails if port is taken (good for debugging)
	},
});
