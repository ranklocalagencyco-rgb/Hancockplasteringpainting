// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Production domain — used for canonical URLs, sitemap, and absolute links.
  // Update this to the real domain before launch.
  site: 'https://hancockplasteringpainting.co.uk',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});