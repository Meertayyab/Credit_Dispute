import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
  ], 
  resolve: {
    alias: {
      // This alias is crucial for shadcn/ui imports like "@/components/ui/button"
      "@": resolve(__dirname, "./src"),
    },
  },
 build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
