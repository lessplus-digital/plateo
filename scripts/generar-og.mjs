/**
 * Genera public/og.jpg (1200x630), la imagen que se ve al pegar el enlace en
 * WhatsApp, LinkedIn o Facebook.
 *
 *   node scripts/generar-og.mjs      (o: npm run og)
 *
 * Se dibuja aquí en vez de exportarla de un diseño por dos razones: el texto
 * sale siempre de las mismas constantes que el sitio —así no se queda diciendo
 * un precio o un dominio viejo— y no hace falta abrir nada para regenerarla.
 *
 * `sharp` no es una dependencia nueva: ya viene instalada porque es el motor de
 * imágenes de `astro:assets`.
 *
 * El logotipo va como trazos SVG, no como texto, para no depender de que la
 * tipografía de marca esté instalada en la máquina que ejecuta esto. El resto
 * del texto sí es texto, con la pila del sistema.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const RAIZ = new URL('../', import.meta.url);
const SALIDA = fileURLToPath(new URL('public/og.jpg', RAIZ));

const ANCHO = 1200;
const ALTO = 630;

// Paleta de marca, en hex porque el renderizador de SVG no entiende oklch().
const NAVY = '#211951';
const NAVY_OSCURO = '#1a1140';
const MENTA = '#15F5BA';
const VIOLETA = '#836FFF';

/*
  Los trazos del isotipo salen del propio componente <Logo />: se leen del
  archivo en vez de copiarse aquí, para que no haya dos versiones del logo que
  puedan divergir.
*/
async function trazosDelIsotipo() {
  const logo = await readFile(fileURLToPath(new URL('src/components/ui/Logo.astro', RAIZ)), 'utf8');
  const bloque = logo.match(/const MARK_PATHS = \[([\s\S]*?)\];/);
  if (!bloque) throw new Error('No se encontró MARK_PATHS en Logo.astro');

  return [...bloque[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
}

const isotipo = await trazosDelIsotipo();

// El isotipo mide 559.5 x 413.88 en su viewBox original.
const ESCALA = 0.17;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${ANCHO}" height="${ALTO}" viewBox="0 0 ${ANCHO} ${ALTO}">
  <defs>
    <linearGradient id="fondo" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${NAVY}"/>
      <stop offset="100%" stop-color="${NAVY_OSCURO}"/>
    </linearGradient>
    <pattern id="reticula" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M60 0H0V60" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${ANCHO}" height="${ALTO}" fill="url(#fondo)"/>
  <rect width="${ANCHO}" height="${ALTO}" fill="url(#reticula)"/>

  <!-- Filete de marca en el borde inferior -->
  <rect x="0" y="${ALTO - 10}" width="${ANCHO}" height="10" fill="${MENTA}"/>

  <!-- Isotipo -->
  <g transform="translate(84, 74) scale(${ESCALA})" fill="${MENTA}">
    ${isotipo.map((d) => `<path d="${d}"/>`).join('\n    ')}
  </g>

  <!-- Etiqueta -->
  <g transform="translate(84, 200)">
    <rect x="0" y="0" width="284" height="38" rx="19" fill="${VIOLETA}" fill-opacity="0.22"/>
    <text x="20" y="25" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="17"
      font-weight="600" fill="${MENTA}" letter-spacing="1.4">HECHO EN COLOMBIA</text>
  </g>

  <!-- Titular -->
  <text x="84" y="322" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="62"
    font-weight="700" fill="#ffffff">Un agente de IA atiende</text>
  <text x="84" y="394" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="62"
    font-weight="700" fill="#ffffff">el WhatsApp de tu restaurante</text>

  <!-- Subrayado a mano bajo "tu restaurante" -->
  <path d="M700 419 C790 409 900 409 986 416" stroke="${MENTA}" stroke-width="7"
    stroke-linecap="round" fill="none"/>

  <!-- Bajada -->
  <text x="84" y="468" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="29"
    fill="#c9c3e4">Toma pedidos, aparta mesas y los ordena en un panel en tiempo real.</text>

  <!-- Pie -->
  <text x="84" y="556" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="26"
    font-weight="600" fill="${MENTA}">plateo.cloud</text>
  <text x="290" y="556" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="26"
    fill="#8b83b5">Sin comisiones por venta</text>
</svg>`;

await sharp(Buffer.from(svg))
  .jpeg({ quality: 88, progressive: true, chromaSubsampling: '4:4:4' })
  .toFile(SALIDA);

const { size } = await sharp(SALIDA).metadata().then(async (m) => ({
  ...m,
  size: (await readFile(SALIDA)).length,
}));

console.log(`✓ public/og.jpg — ${ANCHO}x${ALTO}, ${Math.round(size / 1024)} KB`);

// Copia en SVG por si algún día hay que retocarla en un editor vectorial.
await writeFile(fileURLToPath(new URL('public/og.svg', RAIZ)), svg, 'utf8');
