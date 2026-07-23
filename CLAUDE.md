# CLAUDE.md

Guía para Claude Code (claude.ai/code) al trabajar en este repositorio.

## Qué es este repo

Sitio web público (landing page) de **Plateo**, el producto SaaS que digitaliza
restaurantes: un asistente de WhatsApp toma los pedidos y un panel de administración
los gestiona en tiempo real.

Es un repo **independiente y sin backend**. No comparte código con el panel.

- **Plateo** = la marca del producto. Es lo que se vende en esta web.
- **Vera Pizzería** = el primer cliente. Su marca **nunca** va en esta web salvo como
  caso de éxito explícito.
- El panel de administración vive en otro repo (`../pizza-dashboard`, React + Vite).
  Desde aquí solo se enlaza a su login vía `LINKS.login`.

## Comandos

```bash
npm run dev       # servidor de desarrollo (localhost:4321)
npm run build     # type-check (astro check) + build de producción a dist/
npm run preview   # sirve dist/ localmente
npm run check     # solo type-check
```

Para levantar el dev server desde una sesión de agente, usa modo background:

```bash
astro dev --background   # y luego: astro dev status | logs | stop
```

No hay test runner ni linter configurados. `npm run build` **sí** hace type-check,
así que es la verificación real antes de commitear.

## Stack y por qué

| Pieza | Decisión |
|---|---|
| **Astro 5** | Salida estática, 0 KB de JS por defecto. El HTML llega renderizado, que es lo que necesitan Google y los crawlers de redes sociales (no ejecutan JS). |
| **Tailwind CSS v4** | Config vía `@theme` en CSS, sin `tailwind.config.js`. |
| **TypeScript strict** | Props de componentes siempre tipadas con `interface Props`. |
| **Vercel** | Salida estática; push a `main` despliega. |
| **Fontsource** | Inter Variable self-hosted. Nunca Google Fonts por CDN. |

**Sin framework de UI (React/Vue/Svelte).** Astro solo, con `<script>` vanilla para lo
poco interactivo. Si algo llegara a necesitar estado real, se añade una isla
(`client:visible`) — pero primero justifica por qué no basta CSS.

## Estructura

```
src/
  consts.ts                 # SITE, LINKS, NAV — fuente única de copy/URLs
  layouts/Layout.astro      # html/head/body + Header + Footer
  components/
    BaseHead.astro          # ÚNICO sitio con meta/OG/canonical/JSON-LD
    layout/                 # Header, Footer
    sections/               # bloques de página (Hero, Features, Showcase, CTA)
    ui/                     # primitivas reutilizables (Button, Reveal, Carousel, VideoLoop)
  scripts/reveal.ts         # IntersectionObserver global del scroll reveal
  styles/global.css         # tokens @theme + base + utilidades
  pages/                    # una ruta por archivo
public/                     # se sirve tal cual: robots.txt, og.jpg, /videos, /favicon
```

## Reglas que importan

### Rendimiento (es el motivo de elegir Astro — no lo tires)

- **Nada de GIFs.** Un GIF de 3 s pesa 5–10 MB. Usa `<VideoLoop />` con MP4 + WebM:
  10–20× menos peso. El comando de `ffmpeg` está documentado dentro del componente.
- **Imágenes siempre por `astro:assets`** (`import { Image } from 'astro:assets'`) con
  los archivos en `src/assets/`, no en `public/`. Así hay AVIF/WebP y dimensiones
  automáticas. `public/` solo para lo que debe conservar su nombre y ruta exacta.
- **Todo medio lleva `width` y `height`.** Sin eso el CLS se dispara.
- **No añadas librerías de animación por defecto.** El orden es: CSS → `IntersectionObserver`
  → Motion One (~5 KB) → nada más. Framer Motion está prohibido (arrastra React entero).
- Antes de meter cualquier dependencia de runtime, mira cuánto suma al bundle.

### SEO

- Los tags de `<head>` viven **solo** en `BaseHead.astro`. No los dupliques en páginas.
- Cada página nueva pasa `title` y `description` propios al `Layout`.
- Un solo `<h1>` por página, y la jerarquía de headings sin saltos.
- `SITE.url` en `consts.ts` y `site` en `astro.config.mjs` deben coincidir siempre —
  de ahí salen el canonical, las OG absolutas y el sitemap.
- El sitemap se genera solo en el build (`/sitemap-index.xml`).

### Accesibilidad

- Toda animación respeta `prefers-reduced-motion` (ya cubierto en `global.css`;
  no escribas animaciones que lo salten).
- Los `[data-reveal]` no pueden ocultar contenido crítico si falla el JS — de eso se
  encarga la clase `no-js` del `<html>`.
- Los enlaces externos llevan `target="_blank"` **y** `rel="noopener noreferrer"`
  (`<Button external />` ya lo hace).

### Estilos

- Diseño **dark-first**. No hay theme toggle y no se necesita.
- Los colores salen de los tokens `@theme` (`ink-*`, `brand-*`). Nunca uses la paleta
  por defecto de Tailwind (`gray-500`, `orange-400`, …) ni hex sueltos.
- Un solo botón `primary` visible por pantalla.
- Ancho de página: la utilidad `container-page`, no `max-w-7xl mx-auto px-4` a mano.

### Contenido

- Todo el texto en **español**. El copy de marca y las URLs salen de `consts.ts`,
  no hardcodeados dentro de los componentes.
- Los `TODO:` en el código marcan lo que espera assets o datos reales
  (videos del producto, dominio final, número de WhatsApp, `og.jpg`).

## Pendientes conocidos

- `SITE.url`, `LINKS.login`, `LINKS.whatsapp` y `LINKS.email` son **placeholders**.
- La paleta `brand-*` es **provisional**, a la espera de la identidad visual oficial.
- Faltan los videos reales del producto (Hero y Showcase usan marcadores).
- Falta `public/og.jpg` (1200×630) — sin él las previews en WhatsApp salen vacías.
- Sin analítica. Cuando toque: Plausible o Umami (~1 KB), no GA4.

## Documentación de Astro

Consulta la guía correspondiente antes de trabajar en cada tema:

- [Rutas, páginas y middleware](https://docs.astro.build/en/guides/routing/)
- [Componentes Astro](https://docs.astro.build/en/basics/astro-components/)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/) — para el blog cuando toque
- [Estilos y Tailwind](https://docs.astro.build/en/guides/styling/)
- [Imágenes y `astro:assets`](https://docs.astro.build/en/guides/images/)
- [Internacionalización](https://docs.astro.build/en/guides/internationalization/)
