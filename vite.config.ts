/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from "path"
import react from "@vitejs/plugin-react"
import mkcert from 'vite-plugin-mkcert'

import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), mkcert()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8000
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/setupTest.ts"],
  },
})
