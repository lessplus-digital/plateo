/**
 * Fuente única de verdad para datos del sitio.
 * Nada de copy de marca hardcodeado dentro de los componentes: todo sale de aquí.
 */

export const SITE = {
  name: 'Plateo',
  /** Se usa como sufijo: "<título de página> · Plateo" */
  titleTemplate: 'Plateo',
  defaultTitle: 'Plateo · Agente IA para restaurantes',
  description:
    'Plateo recibe los pedidos de tu restaurante por WhatsApp y los organiza en un panel en tiempo real: cocina, domicilios, clientes y reservas en un solo lugar.',
  /** Sin barra final. Debe coincidir con `site` en astro.config.mjs. */
  url: 'https://plateo.app',
  lang: 'es',
  locale: 'es_CO',
  /** Imagen de 1200x630 en /public. Es lo que se ve al compartir en WhatsApp/LinkedIn. */
  ogImage: '/og.jpg',
  /** Navy de marca (#211951). Es el color de la barra del navegador en móvil. */
  themeColor: '#211951',
} as const;

export const LINKS = {
  /**
   * Dashboard del cliente. TODO: apuntar al dominio real del panel.
   *
   * Ahora mismo no se enlaza desde ninguna parte del sitio: el «Entrar al
   * panel» del footer se quitó porque todavía no hay panel al que entrar. Se
   * conserva la constante para volver a colgarlo del footer cuando lo haya.
   */
  login: 'https://app.plateo.app',
  /**
   * NUESTRO WhatsApp: el canal real de ventas y soporte, donde contesta una
   * persona. Es el del cierre de la página y el del footer. No lo confundas
   * con `whatsappDemo` — ver el aviso de ahí abajo.
   *
   * wa.me exige el formato internacional sin '+', sin espacios y sin guiones.
   */
  whatsapp: 'https://wa.me/573113298122',
  /** El mismo número, pero para leerlo. Nunca lo escribas a mano en un componente. */
  whatsappDisplay: '+57 311 329 8122',
  /**
   * El AGENTE DE DEMOSTRACIÓN, que es otro número y otra cosa: un Plateo
   * completo atendiendo el WhatsApp de una pizzería de ejemplo. Quien escribe
   * aquí no habla con nosotros, habla con el bot, y le va a responder con el
   * menú de esa pizzería.
   *
   * Es una instancia de pruebas y se queda siéndolo: cuando el primer cliente
   * entre en producción lo hará sobre su propio número, no sobre este. Así
   * este puede recibir todo el tráfico frío de la web —y todos los pedidos de
   * mentira que lleguen— sin que eso caiga en la cocina de nadie.
   *
   * De ahí que sea el destino del "Probarlo por WhatsApp" del hero y de ningún
   * otro sitio: es el demo del producto, no un canal de contacto. Si alguien
   * llega aquí buscando precios de Plateo, la conversación no tiene arreglo.
   *
   * Por la misma razón el sitio nunca nombra a la pizzería: es un cliente, y
   * su marca solo aparece en esta web si algún día se hace un caso de éxito
   * con su permiso (ver CLAUDE.md).
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
 * una sección: el día que cambie hay que tocar UN archivo.
 *
 * Los importes son números, no cadenas. El formato con puntos de millar lo pone
 * `Intl.NumberFormat('es-CO')` en el componente, así nadie escribe "690000" en
 * un sitio y "690.000" en otro. Y `anualTotal` / `anualAhorro` se DERIVAN de los
 * dos precios: son las cifras que más tientan a teclear a mano y a que se queden
 * desfasadas cuando alguien mueva la mensualidad.
 *
 * ── Un solo plan ──────────────────────────────────────────────────────────
 *
 * No hay paquetes. Con un producto que se vende entero —el agente y el panel
 * van juntos, no hay módulos— la única razón para partirlo en planes sería
 * capar funciones, y eso contradice el "sin apps ni módulos" del hero. Lo que
 * varía es el ciclo de cobro, y de eso se encarga el conmutador de la sección.
 *
 * No anuncies aquí nada que no esté construido: el resumen diario por WhatsApp
 * y el modo TV de cocina siguen en el backlog del panel.
 *
 * ── De dónde sale el número ───────────────────────────────────────────────
 *
 * Costo directo por cliente a ~300 pedidos/mes: OpenAI (el grueso), el proyecto
 * de Supabase, el contenedor de n8n y las plantillas de WhatsApp — las
 * conversaciones que abre el cliente no se cobran, solo las plantillas. Ronda
 * los 180.000 sin contar soporte, así que 490.000 deja ~55-60% de margen. Sube
 * cuando el VPS y la organización de Supabase se repartan entre varios clientes.
 *
 * Cuidado con una cosa: ese margen SOLO se sostiene con el orquestador de n8n en
 * un modelo pequeño y con caché de prompts activada. Con los cinco agentes en el
 * modelo grande, un local activo se come el margen entero.
 *
 * El tope de pedidos no es una restricción comercial, es la protección de ese
 * margen: cada pedido son llamadas al modelo. 600 al mes son 20 diarios, que
 * cubren de sobra a un local pequeño; el que los pase merece una llamada, no un
 * sobrecosto sorpresa.
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
 * Nombra las dos mitades del producto —el agente de WhatsApp y el panel— en
 * vez de describir la página. "Qué hace" y "Puesta en marcha" hablaban de
 * secciones de una landing; un dueño de restaurante busca el agente que
 * contesta y la pantalla donde caen los pedidos, y esas son las palabras que
 * tiene que ver.
 *
 * El orden es el mismo en que las secciones aparecen en la página, y tiene que
 * seguir siéndolo: un menú que salta hacia atrás obliga a leer las cuatro
 * entradas para entender dónde está uno. Si reordenas `index.astro`, reordena
 * esto. Cada `href` apunta a un id que existe.
 */
export const NAV: ReadonlyArray<{ label: string; href: string }> = [
  { label: 'Funciones', href: '#producto' },
  { label: 'Verlo en vivo', href: '#en-vivo' },
  { label: 'Cómo empezar', href: '#como-funciona' },
  { label: 'El panel', href: '#panel' },
  { label: 'Precios', href: '#precios' },
];
