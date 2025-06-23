import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());

	if (env.VITE_OUTDIR === "test") {
		console.log("테스트url 버전 !!!!", env.VITE_BASEURL);
	}
	return {
		plugins: [react()],
		define: {
			"process.env": {
				VITE_BASEURL: env.VITE_BASEURL,
				VITE_OUTDIR: env.VITE_OUTDIR,
			},
		},
	};
});
