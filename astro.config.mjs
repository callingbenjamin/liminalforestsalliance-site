import { defineConfig } from 'astro/config';

// https://astro.build
export default defineConfig({
  site: 'https://liminalforestsalliance.com',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
