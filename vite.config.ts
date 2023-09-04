import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [react()],
  build: {
    rollupOptions: {
      // To ignore missing import in "node_modules/@ethersphere/bee-js/dist/mjs/utils/stream.js"
      shimMissingExports: true,
    },
  },
});
