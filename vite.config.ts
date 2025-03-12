import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".png", ".svg", ".jpg", ".gif", ".ts", ".tsx", ".js", ".jsx"],
  },
});
