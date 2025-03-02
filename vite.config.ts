import { defineConfig } from "vite";
import dotenv from "dotenv";

// dotenv.config(); // Load .env file

export default defineConfig({
    base: "/currency-converter/", // Set for GitHub Pages
    build: {
      outDir: "dist/",
      rollupOptions: {
        input: "index.html", // Ensure Vite knows the entry point
      },
    },
});