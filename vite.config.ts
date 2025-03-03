import { defineConfig } from "vite";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

export default defineConfig({
    base: "/currency-converter/", // Set for GitHub Pages
    root: "src", // Tell Vite to use `src/` as the root
    build: {
      outDir: "../dist",
      emptyOutDir: true, // ✅ Allow Vite to clean `dist/` before building
      rollupOptions: {
        input: "src/index.html", // Ensure Vite knows the entry point
      },
    },
    define: {
        "process.env": process.env, // Ensure env variables are accessible
      },
});