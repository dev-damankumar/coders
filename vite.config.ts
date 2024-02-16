import { defineConfig } from 'vite';
import dotenv from 'dotenv';

import react from '@vitejs/plugin-react-swc';
dotenv.config(); // load env vars from .env

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: 'REACT_APP_',
  define: {
    REACT_APP_BASE_URL: `"${process.env.REACT_APP_BASE_URL}"`,
    REACT_APP_WEB_URL: `"${process.env.REACT_APP_WEB_URL}"`,
    REACT_APP_JWT_SECRET: `"${process.env.REACT_APP_JWT_SECRET}"`,
    REACT_APP_STRIPE_KEY: `"${process.env.REACT_APP_STRIPE_KEY}"`,
  },
});
