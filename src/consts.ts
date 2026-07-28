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
  /** Dashboard del cliente. TODO: apuntar al dominio real del panel. */
  login: 'https://app.plateo.app',
  /** wa.me exige el formato internacional sin '+', sin espacios y sin guiones. */
  whatsapp: 'https://wa.me/573113298122',
  /** El mismo número, pero para leerlo. Nunca lo escribas a mano en un componente. */
  whatsappDisplay: '+57 311 329 8122',
  instagram: 'https://www.instagram.com/plateo.cloud/',
  instagramHandle: '@plateo.cloud',
  email: 'hola@plateo.app',
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
];
