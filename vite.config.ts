import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());

	if (env.VITE_ENV === "dev") {
		console.log("dev 버전 !!!! API서버 :", env.VITE_API_BASE_URL);
	}
	return {
		plugins: [react()],
		define: {
			"process.env": {
				VITE_API_BASE_URL: env.VITE_API_BASE_URL,
				VITE_ENV: env.VITE_ENV,
			},
		},
		build: {
			outDir: env.VITE_BUILD_DIR,
			copyPublicDir: true,
		},
		base: env.VITE_BASE_URL,
	};
});
