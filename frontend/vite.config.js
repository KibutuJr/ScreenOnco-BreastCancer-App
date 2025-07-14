// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./", // ✅ Fix for Netlify — use relative paths
  plugins: [react()],
  server: {
    proxy: {
      "/api/insights": {
        target: "http://localhost:5174",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/insights/, "/mock-insights.json"),
      },
    },
  },
});
