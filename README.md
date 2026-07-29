# Plateo — sitio web

Landing page de **Plateo**, el SaaS que digitaliza restaurantes: un agente de IA
atiende el WhatsApp y un panel gestiona los pedidos en tiempo real.

**Stack:** Astro 5 (salida estática) · Tailwind CSS v4 · TypeScript strict · Vercel

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:4321
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Type-check (`astro check`) + build a `dist/` |
| `npm run preview` | Sirve `dist/` para revisar el build real |
| `npm run check` | Solo type-check |
| `npm run og` | Regenera `public/og.jpg` (imagen de previsualización social) |

## Estructura

```
scripts/generar-og.mjs   # dibuja public/og.jpg con sharp
src/
  consts.ts              # SITE, LINKS, PRECIOS, NAV, PAGINAS — copy y URLs
  layouts/
    Layout.astro         # html/head/body + Header + Footer
    Pagina.astro         # páginas de texto (FAQ, legales)
  components/
    BaseHead.astro       # meta, Open Graph, canonical, JSON-LD — el único sitio
    layout/              # Header, Footer
    sections/            # bloques de la home, en su orden
    ui/                  # Button, Logo, Mark, Doodle, Sticker, Ticket,
                         # Reveal, Carousel, Lightbox, Icon
  scripts/reveal.ts      # IntersectionObserver del scroll reveal
  styles/global.css      # tokens @theme + base + utilidades
  pages/                 # una ruta por archivo
public/                  # robots.txt, og.jpg, site.webmanifest, favicons
images/                  # fuentes de marca (logo, paleta, referencias). No entra al build
```

## Rutas

| Ruta | Qué es |
|---|---|
| `/` | La landing. Es la página del sitio |
| `/preguntas-frecuentes` | FAQ con datos estructurados. Es la página que trabaja el SEO de cola larga |
| `/privacidad` | Política de tratamiento de datos (Ley 1581 de 2012) |
| `/terminos` | Términos y condiciones |
| `/404` | Página de error, con `noindex` |

## Antes de publicar

- [ ] Apuntar el dominio `plateo.cloud` a Vercel
- [ ] URL de login del panel en `src/consts.ts` (`LINKS.login`), y volver a colgar el enlace del footer
- [ ] Razón social y NIT en `/privacidad` y `/terminos` cuando la empresa esté constituida
- [ ] Testimonio real en `src/components/sections/Testimonial.astro` (cita, cifras y foto)
- [ ] Dar de alta el sitio en Google Search Console y enviar `/sitemap-index.xml`

## Despliegue

Salida estática. En Vercel: framework **Astro**, build `npm run build`, output `dist`.
Push a `main` despliega.

Convenciones de código y decisiones de arquitectura: ver [`CLAUDE.md`](./CLAUDE.md).
