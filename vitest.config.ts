import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/shared/setup-test.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    },
    exclude: ['**/node_modules/**', '**/e2e/**']
  }
})
