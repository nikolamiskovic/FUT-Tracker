import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const token = env.VITE_FOOTBALL_DATA_KEY;

  console.log("Football API key loaded:", Boolean(token));

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api/football-data": {
          target: "https://api.football-data.org/v4",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/football-data/, ""),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              proxyReq.setHeader("X-Auth-Token", token || "");
            });
          },
        },
      },
    },
  };
});