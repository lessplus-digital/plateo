/**
 * Fuente única de verdad para datos del sitio.
 * Nada de copy de marca hardcodeado dentro de los componentes: todo sale de aquí.
 */

export const SITE = {
  name: 'Plateo',
  /** Se usa como sufijo: "<título de página> · Plateo" */
  titleTemplate: 'Plateo',
  defaultTitle: 'Plateo · Pedidos por WhatsApp, tu restaurante bajo control',
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
  /** TODO: número comercial real, formato internacional sin '+'. */
  whatsapp: 'https://wa.me/573000000000',
  email: 'hola@plateo.app',
} as const;

export const NAV: ReadonlyArray<{ label: string; href: string }> = [
  { label: 'Qué hace', href: '#producto' },
  { label: 'Verlo en vivo', href: '#en-vivo' },
  { label: 'Puesta en marcha', href: '#como-funciona' },
];
