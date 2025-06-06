
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Add dedupe to resolve conflicts between different versions of Three.js
    dedupe: ['three', '@react-three/fiber', '@react-three/drei'],
  },
  // Add build options for Vercel deployment
  build: {
    commonjsOptions: {
      // This helps with resolving dependencies that have mixed module formats
      transformMixedEsModules: true,
    },
  },
}));
