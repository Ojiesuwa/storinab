import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    allowedHosts: [
      "192.168.196.143.nip.io",
      "8e9d-105-113-103-190.ngrok-free.app",
    ],
  },
});
