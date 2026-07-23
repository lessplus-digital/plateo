# Plateo — sitio web

Landing page de **Plateo**, el SaaS que digitaliza restaurantes: un asistente de
WhatsApp toma los pedidos y un panel los gestiona en tiempo real.

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

## Estructura

```
src/
  consts.ts            # SITE, LINKS, NAV — el copy y las URLs viven aquí
  layouts/             # Layout base
  components/
    BaseHead.astro     # meta, Open Graph, canonical, JSON-LD
    layout/            # Header, Footer
    sections/          # bloques de la home
    ui/                # Button, Reveal, Carousel, VideoLoop
  scripts/             # JS suelto (scroll reveal)
  styles/global.css    # tokens de diseño (@theme) + base
  pages/               # una ruta por archivo
public/                # robots.txt, og.jpg, /videos, favicon
```

## Antes de publicar

- [ ] Dominio real en `astro.config.mjs` (`site`), `src/consts.ts` (`SITE.url`) y `public/robots.txt`
- [ ] URL de login, WhatsApp comercial y correo en `src/consts.ts`
- [ ] `public/og.jpg` de 1200×630
- [ ] Videos del producto en `public/videos/` (MP4 + WebM — nunca GIF)
- [ ] Paleta `brand-*` definitiva en `src/styles/global.css`

## Despliegue

Salida estática. En Vercel: framework **Astro**, build `npm run build`, output `dist`.
Push a `main` despliega.

Convenciones de código y decisiones de arquitectura: ver [`CLAUDE.md`](./CLAUDE.md).
