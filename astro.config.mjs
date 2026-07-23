// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Necesario para canonical, OG absolutas y sitemap. Cambiar al dominio real.
  site: 'https://plateo.app',
  trailingSlash: 'never',

  // Precarga los links visibles en el viewport -> navegación instantánea (~1 KB).
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },

  build: {
    // Inyecta el CSS pequeño en el HTML: evita un round-trip en el render inicial.
    inlineStylesheets: 'auto',
  },

  image: {
    // Formatos modernos por defecto al usar <Image /> de astro:assets.
    responsiveStyles: true,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap()],
});
