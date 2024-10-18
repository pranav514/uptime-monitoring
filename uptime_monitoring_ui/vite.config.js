import { defineConfig } from 'vite'
import dotenv from "dotenv"
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  define : {
    process : process.env
  },
  plugins: [react()],
})
