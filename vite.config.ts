import { UserConfig, defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config: UserConfig = {
    base: "",
    plugins: [react()],
  };

  if (command === "serve") {
    config.define = {
      global: "({})",
    };
  } else {
    config.build = {
      rollupOptions: {
        // To ignore missing import in "node_modules/@ethersphere/bee-js/dist/mjs/utils/stream.js"
        shimMissingExports: true,
      },
    };
  }

  return config;
});
