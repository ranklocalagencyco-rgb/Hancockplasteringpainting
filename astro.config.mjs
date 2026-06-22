// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Production domain — used for canonical URLs, sitemap, and absolute links.
  // Update this to the real domain before launch.
  site: 'https://hancockplasteringpainting.co.uk',
  integrations: [sitemap()],
  vite: {
    build: {
      // Target older engines so the CSS minifier keeps the universally
      // supported `@media (max-width: ...)` syntax instead of downleveling to
      // modern range syntax `@media (width <= ...)`, which iOS Safari < 16.4
      // and older Samsung Internet ignore entirely — breaking ALL
      // responsiveness on those devices.
      cssTarget: ['safari12', 'ios12', 'chrome80', 'firefox78', 'edge88'],
    },
  },
});