import { defineConfig } from 'vite'

const apiTarget = process.env.VITE_API_PROXY_TARGET ?? 'http://127.0.0.1:4000'

export default defineConfig({
  server: {
    // strictPort + sabit adres: yanlış portta (5174/5175) acilmis localhost sorununu engeller.
    host: true,
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: apiTarget,
        changeOrigin: true,
        configure(proxy) {
          proxy.on('error', (err) => {
            console.error('[vite proxy] API gecidi hatasi (API calisiyor mu?),', err.message)
          })
        },
      },
    },
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: true,
    proxy: {
      '/api': {
        target: apiTarget,
        changeOrigin: true,
        configure(proxy) {
          proxy.on('error', (err) => {
            console.error('[vite proxy] API gecidi hatasi (API calisiyor mu?),', err.message)
          })
        },
      },
    },
  },
})
