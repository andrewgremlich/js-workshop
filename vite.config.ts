import { resolve } from "node:path";
import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => ({
  build: {
    outDir: "dist", // Specify the new output directory name
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        raycaster: resolve(__dirname, "pages/raycaster.html"),
        "offscreen-canvas": resolve(__dirname, "pages/offscreen-canvas.html"),
        "css-graphics": resolve(__dirname, "pages/css-graphics.html"),
        "raycaster-calc": resolve(__dirname, "pages/raycaster-calc.html"),
        "stereo": resolve(__dirname, "pages/stereo.html"),
      },
    },
  },
  plugins: [tsconfigPaths(), topLevelAwait()],
}));
