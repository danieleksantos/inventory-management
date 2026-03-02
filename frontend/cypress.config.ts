import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost',
    chromeWebSecurity: false,
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
