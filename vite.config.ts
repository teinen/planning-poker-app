import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    open: true,
  },
  build: {
    outDir: "build",
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
  ],
});
