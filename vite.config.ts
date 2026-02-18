import { resolve } from "node:path";
import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";
import tsconfigPaths from "vite-tsconfig-paths";

const root = import.meta.dirname;

export default defineConfig(() => ({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        raycaster: resolve(root, "pages/raycaster.html"),
        "offscreen-canvas": resolve(root, "pages/offscreen-canvas.html"),
        "css-graphics": resolve(root, "pages/css-graphics.html"),
        "raycaster-calc": resolve(root, "pages/raycaster-calc.html"),
        "stereo": resolve(root, "pages/stereo.html"),
        "joycon": resolve(root, "pages/joycon.html"),
      },
    },
  },
  plugins: [tsconfigPaths(), topLevelAwait()],
}));
