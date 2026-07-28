/**
 * Fuente única de verdad para datos del sitio.
 * Nada de copy de marca hardcodeado dentro de los componentes: todo sale de aquí.
 */

export const SITE = {
  name: 'Plateo',
  /** Se usa como sufijo: "<título de página> · Plateo" */
  titleTemplate: 'Plateo',
  /**
   * Título de la home. Va con la palabra clave delante y la marca al final:
   * Google recorta sobre los 60 caracteres y lo primero es lo que pesa.
   */
  defaultTitle: 'Agente de IA para restaurantes que atiende WhatsApp | Plateo',
  /**
   * Meta description. Entre 150 y 160 caracteres: más largo y Google lo corta.
   * No posiciona por sí sola, pero decide si hacen clic en el resultado.
   */
  description:
    'Plateo atiende el WhatsApp de tu restaurante con un agente de IA: toma pedidos, agenda reservas y los ordena en un panel en tiempo real. Sin comisiones.',
  /** Frase corta para el JSON-LD y el footer. */
  tagline: 'Agente de IA y panel de pedidos para restaurantes en Colombia',
  /** Sin barra final. Debe coincidir con `site` en astro.config.mjs. */
  url: 'https://plateo.cloud',
  lang: 'es',
  locale: 'es_CO',
  /** Imagen de 1200x630 en /public. Es lo que se ve al compartir en WhatsApp/LinkedIn. */
  ogImage: '/og.jpg',
  /** Navy de marca (#211951). Es el color de la barra del navegador en móvil. */
  themeColor: '#211951',
  /** País al que se vende. Alimenta `areaServed` y las meta de geolocalización. */
  country: 'CO',
  countryName: 'Colombia',
  city: 'Medellín',
  /** Año de arranque del proyecto. Para el `foundingDate` del schema. */
  founded: '2025',
} as const;

export const LINKS = {
  /**
   * Dashboard del cliente. TODO: apuntar al dominio real del panel.
   * Hoy no se enlaza desde ninguna parte: no hay panel publicado al que entrar.
   * Se conserva para volver a colgarlo del footer cuando lo haya.
   */
  login: 'https://app.plateo.cloud',
  /**
   * NUESTRO WhatsApp: el canal de ventas y soporte, donde contesta una persona.
   * No confundir con `whatsappDemo`. wa.me exige formato internacional sin '+',
   * sin espacios y sin guiones.
   */
  whatsapp: 'https://wa.me/573113298122',
  /** El mismo número, pero para leerlo. Nunca lo escribas a mano en un componente. */
  whatsappDisplay: '+57 311 329 8122',
  /** En formato E.164, que es el que pide el schema.org de `telephone`. */
  whatsappE164: '+573113298122',
  /**
   * El AGENTE DE DEMOSTRACIÓN: otro número y otra cosa. Un Plateo completo
   * atendiendo el WhatsApp de una pizzería de ejemplo. Quien escribe aquí habla
   * con el bot, no con nosotros, y recibe el menú de esa pizzería.
   *
   * Es una instancia de pruebas y se queda siéndolo: así absorbe todo el tráfico
   * frío de la web —y los pedidos de mentira— sin caer en la cocina de nadie.
   * De ahí que sea el destino del "Probarlo por WhatsApp" del hero y de ningún
   * otro sitio: es el demo del producto, no un canal de contacto.
   *
   * El sitio nunca nombra a esa pizzería: es un cliente, y su marca solo
   * aparecería aquí como caso de éxito y con su permiso (ver CLAUDE.md).
   */
  whatsappDemo: `https://wa.me/573226817466?text=${encodeURIComponent(
    'Hola, vengo de la web de Plateo y quiero probar cómo tomas los pedidos 🍕',
  )}`,
  instagram: 'https://www.instagram.com/plateo.cloud/',
  instagramHandle: '@plateo.cloud',
  email: 'hola@plateo.cloud',
} as const;

/**
 * Precio del servicio.
 *
 * Vive aquí y no dentro de <Pricing /> porque es un dato del negocio, no copy de
 * una sección: el día que cambie hay que tocar UN archivo. Los importes son
 * números, no cadenas; el formato lo pone `Intl.NumberFormat('es-CO')`. Y
 * `anualTotal` / `anualAhorro` se DERIVAN, que son las cifras que más tientan a
 * teclear a mano y a quedarse desfasadas.
 *
 * ── Un solo plan ──────────────────────────────────────────────────────────
 * No hay paquetes. El producto se vende entero —el agente y el panel van
 * juntos—, así que partirlo en planes solo serviría para capar funciones, y eso
 * contradice el "sin apps ni módulos" del hero. Lo que varía es el ciclo de
 * cobro. No anuncies aquí nada que no esté construido.
 *
 * ── De dónde sale el número ───────────────────────────────────────────────
 * Costo directo por cliente a ~300 pedidos/mes: OpenAI (el grueso), Supabase, el
 * contenedor de n8n y las plantillas de WhatsApp. Ronda los 180.000 sin soporte,
 * así que 490.000 deja ~55-60% de margen, y sube cuando el VPS y la organización
 * de Supabase se repartan entre varios clientes.
 *
 * Ese margen SOLO se sostiene con el orquestador de n8n en un modelo pequeño y
 * con caché de prompts activada. El tope de pedidos protege eso mismo: cada
 * pedido son llamadas al modelo. 600 al mes son 20 diarios, de sobra para un
 * local pequeño; el que los pase merece una llamada, no un sobrecosto sorpresa.
 */
const PRECIO_MENSUAL = 490_000;
/** Por mes, comprometiendo el año. 20% menos: dos meses y pico de regalo. */
const PRECIO_ANUAL = 390_000;

export const PRECIOS = {
  /** Sin IVA, y así se dice en la sección. Los restaurantes lo descuentan. */
  moneda: 'COP',
  mensual: PRECIO_MENSUAL,
  anual: PRECIO_ANUAL,
  anualTotal: PRECIO_ANUAL * 12,
  anualAhorro: (PRECIO_MENSUAL - PRECIO_ANUAL) * 12,
  /** Entero hacia abajo: prometer "-20%" y cobrar 20,4 menos nunca molesta. */
  anualDescuento: Math.floor((1 - PRECIO_ANUAL / PRECIO_MENSUAL) * 100),
  /** Montaje. Se perdona con el año — es la palanca que empuja al anual. */
  implementacion: 690_000,
  pedidosIncluidos: 600,
  pedidoExtra: 1_500,
} as const;

/**
 * Menú principal.
 *
 * Nombra las dos mitades del producto —el agente de WhatsApp y el panel— en vez
 * de describir la página: un dueño de restaurante busca el agente que contesta y
 * la pantalla donde caen los pedidos.
 *
 * El orden es el mismo en que las secciones aparecen en la página, y tiene que
 * seguir siéndolo. Si reordenas `index.astro`, reordena esto. Cada `href` apunta
 * a un id que existe.
 */
export const NAV: ReadonlyArray<{ label: string; href: string }> = [
  { label: 'Funciones', href: '/#producto' },
  { label: 'Verlo en vivo', href: '/#en-vivo' },
  { label: 'Cómo empezar', href: '/#como-funciona' },
  { label: 'El panel', href: '/#panel' },
  { label: 'Precios', href: '/#precios' },
];

/**
 * Páginas de apoyo. No van en el menú principal —la landing sigue siendo la
 * página— pero sí en el footer: es lo que las hace rastreables por Google y lo
 * que reparte autoridad hacia ellas.
 */
export const PAGINAS: ReadonlyArray<{ label: string; href: string }> = [
  { label: 'Preguntas frecuentes', href: '/preguntas-frecuentes' },
  { label: 'Privacidad', href: '/privacidad' },
  { label: 'Términos', href: '/terminos' },
];
