import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative URLs work both at the domain root and at /self-massage/.
  base: './',
  server: {host:'127.0.0.1',port:4186,strictPort:true},
  preview: {host:'127.0.0.1',port:4186,strictPort:true},
  build: {outDir:'dist'},
});
