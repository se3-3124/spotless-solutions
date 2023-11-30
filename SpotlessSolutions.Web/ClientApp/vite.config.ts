import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const baseFolder = path.join(__dirname, './generated_certs');

function isHttps() {
  return process.env.HTTPS_CERT && process.env.HTTPS_KEY
}

function configureHttps() {
  const key = path.join(baseFolder, 'spotless-solutions.key');
  const cert = path.join(baseFolder, 'spotless-solutions.pem');
  
  if (!fs.existsSync(key) || !fs.existsSync(cert)) {
    return {};
  }

  return {
    https: {
      key: fs.readFileSync(key),
      cert: fs.readFileSync(cert),
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `http${isHttps() ? 's' : ''}://localhost:${isHttps() ? '7297' : '5292'}`,
        secure: false,
      },
      '/oauth': {
        target: `http${isHttps() ? 's' : ''}://localhost:${isHttps() ? '7297' : '5292'}`,
        secure: false,
      },
      '/swagger': {
        target: `http${isHttps() ? 's' : ''}://localhost:${isHttps() ? '7297' : '5292'}`,
        secure: false,
      },
    },
    ...configureHttps()
  }
})
