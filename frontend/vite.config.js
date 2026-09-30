import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())
    const backend = env.VITE_BACKEND_URL || 'http://localhost:8000'

    return {
        plugins: [vue(), tailwindcss()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        server: {
            // Même origine que le front → cookies de session Sanctum sans CORS
            proxy: {
                '/api': backend,
                '/sanctum': backend,
            },
        },
    }
})
