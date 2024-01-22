import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig((props) => {
  const env = loadEnv(props.mode, process.cwd(), 'VITE')
  const envWithProcessPrefix = {
    'process.env': `${JSON.stringify(env)}`,
  }

  return {
    define: envWithProcessPrefix,
    plugins: [react()],
  }
})
