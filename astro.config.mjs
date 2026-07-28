// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // De aquí salen el canonical, las OG absolutas y el sitemap.
  // Tiene que coincidir con SITE.url en src/consts.ts.
  site: 'https://plateo.cloud',
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

  integrations: [
    sitemap({
      /*
        `lastmod` real en cada URL: es la señal que Google usa para decidir si
        merece la pena volver a rastrear. Sin ella, un sitemap estático se
        vuelve ruido a las pocas semanas.

        La prioridad no es un ranking —Google la ignora casi siempre— pero sí
        ordena el rastreo dentro del propio sitio: la home primero.
      */
      changefreq: 'weekly',
      lastmod: new Date(),
      serialize(item) {
        const path = new URL(item.url).pathname.replace(/\/$/, '');

        if (path === '') {
          return { ...item, priority: 1.0, changefreq: 'weekly' };
        }

        // Las legales cambian una vez al año y no compiten por nada.
        if (path === '/privacidad' || path === '/terminos') {
          return { ...item, priority: 0.3, changefreq: 'yearly' };
        }

        return { ...item, priority: 0.7, changefreq: 'monthly' };
      },
    }),
  ],
});
