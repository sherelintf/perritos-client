import { defineConfig } from 'cypress'

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    port: 3001,
    viewportWidth: 1280,
    viewportHeight: 720,
  },
})
