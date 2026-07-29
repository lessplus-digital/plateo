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
npm run og        # regenera public/og.jpg desde scripts/generar-og.mjs
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
| **Fontsource** | Bricolage Grotesque, Inter y Caveat, todas variables y self-hosted. Nunca Google Fonts por CDN. |

**Sin framework de UI (React/Vue/Svelte).** Astro solo, con `<script>` vanilla para lo
poco interactivo. Si algo llegara a necesitar estado real, se añade una isla
(`client:visible`) — pero primero justifica por qué no basta CSS.

## Estructura

```
scripts/generar-og.mjs      # dibuja public/og.jpg con sharp (viene con Astro)
src/
  consts.ts                 # SITE, LINKS, PRECIOS, NAV, PAGINAS — copy y URLs
  layouts/
    Layout.astro            # html/head/body + Header + Footer
    Pagina.astro            # páginas de texto (FAQ, legales) + estilos .prose
  components/
    BaseHead.astro          # ÚNICO sitio con meta/OG/canonical/JSON-LD
    layout/                 # Header, Footer
    sections/               # bloques de página, en el orden en que van en index
    ui/                     # primitivas: Button, Logo, Mark, Doodle, Sticker,
                            # Ticket, Reveal, Carousel, Lightbox, Icon
  scripts/reveal.ts         # IntersectionObserver global del scroll reveal
  styles/global.css         # tokens @theme + base + utilidades
  pages/                    # una ruta por archivo
public/                     # tal cual: robots.txt, og.jpg, site.webmanifest, favicons
images/                     # fuentes de marca y referencias. NO entra al build
```

La home es la página del sitio. `/preguntas-frecuentes`, `/privacidad` y
`/terminos` son **páginas de apoyo**: existen para dar contenido rastreable y
cubrir requisitos de las plataformas de anuncios, no para crecer el sitio. Si
alguien propone añadir más rutas, que justifique qué búsqueda cubre cada una.

## Reglas que importan

### Rendimiento (es el motivo de elegir Astro — no lo tires)

- **Nada de GIFs.** Un GIF de 3 s pesa 5–10 MB. Si hace falta movimiento, MP4 +
  WebM con `<video autoplay muted loop playsinline preload="none">`: 10–20× menos
  peso. Hubo un componente `<VideoLoop />` para esto y se quitó porque nunca se
  llegó a usar; si vuelve a hacer falta, se reescribe en veinte líneas.
- **Imágenes siempre por `astro:assets`** (`import { Image } from 'astro:assets'`) con
  los archivos en `src/assets/`, no en `public/`. Así hay AVIF/WebP y dimensiones
  automáticas. `public/` solo para lo que debe conservar su nombre y ruta exacta.
- **Todo medio lleva `width` y `height`.** Sin eso el CLS se dispara.
- **No añadas librerías de animación por defecto.** El orden es: CSS → `IntersectionObserver`
  → Motion One (~5 KB) → nada más. Framer Motion está prohibido (arrastra React entero).
- Antes de meter cualquier dependencia de runtime, mira cuánto suma al bundle.

### SEO

- Los tags de `<head>` viven **solo** en `BaseHead.astro`. No los dupliques en páginas.
- Cada página nueva pasa `title` y `description` propios al `Layout`. El `title`
  lleva la palabra clave delante y la marca al final; máximo ~60 caracteres.
  La `description`, entre 150 y 160.
- Un solo `<h1>` por página, y la jerarquía de headings sin saltos.
- `SITE.url` en `consts.ts` y `site` en `astro.config.mjs` deben coincidir siempre —
  de ahí salen el canonical, las OG absolutas y el sitemap. Hoy: `plateo.cloud`.
- El sitemap se genera solo en el build (`/sitemap-index.xml`).
- **Datos estructurados:** un solo `@graph` en `BaseHead`, con nodos enlazados por
  `@id`. Las páginas añaden los suyos con la prop `schema`. Nunca marques algo que
  no esté visible en la página, y **nunca inventes valoraciones** (`aggregateRating`
  sin reseñas reales es motivo de acción manual de Google).
- Si el texto de una FAQ y su JSON-LD pueden divergir, están mal escritos: los dos
  salen del mismo array. Ver `pages/preguntas-frecuentes.astro`.

### Accesibilidad

- Toda animación respeta `prefers-reduced-motion` (ya cubierto en `global.css`;
  no escribas animaciones que lo salten).
- Los `[data-reveal]` no pueden ocultar contenido crítico si falla el JS — de eso se
  encarga la clase `no-js` del `<html>`.
- Los enlaces externos llevan `target="_blank"` **y** `rel="noopener noreferrer"`
  (`<Button external />` ya lo hace).

### Estilos

- Diseño **light-first**. Todavía no hay theme toggle, pero los tokens ya están
  preparados: ver «Sistema de color» abajo.
- Los colores salen de los tokens. Nunca uses la paleta por defecto de Tailwind
  (`gray-500`, `orange-400`, …) ni hex sueltos.
- Un solo botón `primary` visible por pantalla.
- Ancho de página: la utilidad `container-page`, no `max-w-7xl mx-auto px-4` a mano.

### Sistema de color

Dos niveles, y la distinción importa:

1. **Paleta** (`--color-mint-*`, `--color-navy-*`, `--color-violet-*`): los tres
   colores oficiales de marca, sacados del logo y de `images/Paleta.png` —
   menta `#15F5BA`, navy `#211951`, violeta `#836FFF`.
2. **Semánticos** (`surface`, `text`, `line`, `accent`…): lo que usan las
   páginas. Están declarados en `:root` y expuestos con `@theme inline`, que
   emite las utilidades como `var(--surface)` en vez de resolver el valor en
   build.

Escribe siempre `bg-surface` / `text-text-muted`, no `bg-white` / `text-navy-600`.
Gracias a esa indirección, **añadir modo oscuro es redefinir el bloque `:root` de
`global.css` y nada más** — ni tocar componentes ni recompilar clases.

Tres trampas de contraste, ya comprobadas:

- La menta sobre blanco da 1.5:1. **Es color de relleno, con texto navy encima**,
  nunca color de texto. Si necesitas menta legible sobre claro, usa `accent-ink`.
- `navy-500` sobre blanco se queda en 3.6:1. Para texto secundario, `navy-600`
  (5:1), que es lo que ya apunta `--text-muted`.
- **La menta no sirve como fondo de sección.** Se probó en Features a sangre
  completa y se quitó: en cuanto el texto secundario baja de opacidad —que es
  justo lo que pide una superficie tan saturada— el contraste se desploma, y
  un bloque tan grande en un color tan vivo cansa la vista. La menta va en
  acentos: rellenos pequeños, trazos de `<Mark />` y el botón primario.

Para dar peso a un bloque claro, la herramienta es una **tarjeta en navy**
dentro de la sección (ver la del agente en Features), no teñir la sección entera.

### Tipografía

Dos familias descargadas, y ninguna más. Entre las dos son ~122 KB (subset
latino), que es todo el peso de la página: no hay imágenes.

| Familia | Token | Para qué |
|---|---|---|
| Bricolage Grotesque | `font-display` | Titulares. Se aplica sola a `h1`/`h2`/`h3`. |
| Inter | `font-sans` | Cuerpo y UI. |
| — (pila del sistema) | `font-mono` | Tiquetes y números de pedido. 0 KB. |
| — (Bricolage ligera) | `handwritten` | Notas al margen de 2-5 palabras. |

Hubo una cursiva (Caveat) para las notas al margen y **se quitó a propósito**:
73 KB para tres frases, y recortada al alfabeto español seguía en 60 KB. Si
alguien la propone otra vez, ese es el precio.

### Lenguaje gráfico

Lo que aleja la web de una plantilla genérica, y conviene no diluir:

- `<Mark />` — trazos de marcador sobre palabras clave. **Uno por titular**, y
  frases cortas (lee el aviso del componente sobre el ajuste de línea).
- `<Doodle />` — flechas y destellos dibujados que guían la lectura.
- `<Sticker />` — etiqueta girada, con sombra dura. Una por pantalla.
- `<Ticket />` — la comanda de papel, el objeto que Plateo reemplaza.
- `<Icon />` — los seis glifos del producto, dibujados a mano sobre 24x24. **No
  instales un set de iconos**: Lucide y Heroicons son los mismos de media web y
  delatan la plantilla al instante.

Todo son SVG propios que se dibujan solos al entrar en pantalla (`data-draw` +
`pathLength="1"`). Nada de librerías de iconos ni de imágenes.

Lo que **no** se usa, por ser el gesto por defecto de cualquier landing
generada: degradados en el texto, glassmorphism, halos radiales difuminados de
fondo y rejillas de tarjetas con iconito.

### Contenido

- Todo el texto en **español**. El copy de marca y las URLs salen de `consts.ts`,
  no hardcodeados dentro de los componentes.
- Los `TODO:` en el código marcan lo que espera assets o datos reales
  (videos del producto, dominio final, número de WhatsApp, `og.jpg`).

## Pendientes conocidos

- `LINKS.login` apunta a un panel que todavía no está publicado, y por eso no se
  enlaza desde ninguna parte.
- El testimonio de `Testimonial.astro` (cita, cifras y foto) es **provisional**:
  hay que sustituirlo por el real y con permiso del cliente.
- `/privacidad` y `/terminos` son borradores sin revisar por un abogado, y les
  falta la razón social y el NIT.
- Modo oscuro: los tokens ya están listos, falta el toggle. Ver «Sistema de color».
- Sin analítica. Cuando toque: Plausible o Umami (~1 KB), no GA4.

## Documentación de Astro

Consulta la guía correspondiente antes de trabajar en cada tema:

- [Rutas, páginas y middleware](https://docs.astro.build/en/guides/routing/)
- [Componentes Astro](https://docs.astro.build/en/basics/astro-components/)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/) — para el blog cuando toque
- [Estilos y Tailwind](https://docs.astro.build/en/guides/styling/)
- [Imágenes y `astro:assets`](https://docs.astro.build/en/guides/images/)
- [Internacionalización](https://docs.astro.build/en/guides/internationalization/)
