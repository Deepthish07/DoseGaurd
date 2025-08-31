export default defineConfig({
  base: '/DoseGaurd/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
