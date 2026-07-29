# SEO de Plateo — qué está hecho y qué falta

Este documento tiene dos mitades: lo que ya está resuelto dentro del código y lo
que solo puedes hacer tú, fuera de él. La segunda mitad es la que mueve la aguja.

---

## Parte 1 — Lo que ya está hecho en el sitio

Todo esto está en el repo y se despliega solo.

### Base técnica

| Qué | Dónde | Por qué importa |
|---|---|---|
| Dominio unificado en `plateo.cloud` | `consts.ts`, `astro.config.mjs`, `robots.txt` | Antes el sitio decía `plateo.app` y el correo `plateo.cloud`. Dos dominios distintos parten la autoridad y confunden a Google |
| Canonical en todas las páginas, sin barra final | `BaseHead.astro` | Evita que Search Console cuente dos URL para la misma página |
| `robots` con `max-image-preview:large` | `BaseHead.astro` | Google muestra miniatura grande en vez de recortada. En móvil es la diferencia entre un resultado que se ve y uno que no |
| Sitemap con `lastmod` real y prioridades | `astro.config.mjs` | Es la señal que Google usa para decidir si vuelve a rastrear |
| `og.jpg` 1200×630 generado desde el código | `scripts/generar-og.mjs` | Antes no existía: cada enlace compartido en WhatsApp salía en blanco. Se regenera con `npm run og` |
| `site.webmanifest` | `public/` | Instalable, y señal menor de calidad |
| Página 404 con `noindex` | `pages/404.astro` | Un 404 indexado se come rastreo que debería ir a lo que importa |

### Datos estructurados (JSON-LD)

Un solo `@graph` con nodos enlazados: `Organization` (logo, contacto, WhatsApp,
Instagram, país al que sirve), `WebSite`, `WebPage`, `SoftwareApplication` con
**precio y lista de funciones**, `BreadcrumbList` en las páginas internas y
`FAQPage` con las 13 preguntas.

Es lo que permite que Google entienda que Plateo **es un producto con un precio**
y no un texto cualquiera, y lo que te hace citable por ChatGPT, Claude o
Perplexity cuando alguien pregunta por software para restaurantes.

> No lleva `aggregateRating`. Inventar valoraciones que no existen es motivo de
> acción manual de Google, no un atajo. Cuando tengas reseñas reales, se añade.

### Título y descripción

Antes: `Plateo · Agente IA para restaurantes` — la marca primero, y nadie busca
tu marca todavía.

Ahora: `Agente de IA para restaurantes que atiende WhatsApp | Plateo` (60
caracteres exactos, la palabra clave delante).

### Páginas nuevas

- **`/preguntas-frecuentes`** — 13 preguntas con respuestas de 40 a 90 palabras.
  Es la página que hace el trabajo de SEO: responde lo que la gente escribe de
  verdad en Google (*«cuánto cuesta un chatbot de WhatsApp para restaurante»*,
  *«se puede usar mi mismo número»*). La landing no puede hacerlo sin dejar de
  ser una landing.
- **`/privacidad`** y **`/terminos`** — obligatorias para que Google Ads y Meta
  aprueben tu cuenta de anuncios, y exigidas por la Ley 1581 de 2012.

### Limpieza

- Se eliminó `VideoLoop.astro`, que no se usaba en ninguna parte.
- Se eliminaron tokens de CSS muertos (`--animate-marquee`, `--animate-blink`,
  `grid-bg`, `--ease-out-expo`, `--ease-spring`, `--surface-raised`,
  `--accent-2-soft`).
- Se recortaron ~600 líneas de comentarios: se quedó el *porqué* de cada decisión
  y se fue la arqueología de lo que se probó y se quitó.
- Los enlaces del menú pasaron de `#seccion` a `/#seccion` para que funcionen
  desde las páginas nuevas.

---

## Parte 2 — El techo, dicho claro

El SEO técnico es la condición de entrada, no la ventaja. Con el sitio como está,
Google ya puede entender, rastrear e indexar todo perfectamente. Lo que decide si
apareces **por encima de otro** es algo que no vive en el código:

1. **Cuánta gente enlaza tu dominio** (autoridad).
2. **Cuánto contenido tienes** que responda búsquedas reales.
3. **Cuántas señales de negocio real** existen: ficha de Google, reseñas,
   directorios, menciones.

Un dominio nuevo, sin enlaces y con cinco páginas no rankea en tres semanas por
mucho JSON-LD que lleve. Cuenta con **tres a seis meses** para ver movimiento
orgánico serio. Por eso lo de pagar publicidad no es plan B: es lo que llena el
hueco mientras el orgánico madura.

---

## Parte 3 — Lo que tienes que hacer tú

En orden de impacto por hora invertida.

### 1. Google Search Console — hoy, 20 minutos, gratis

Sin esto estás a ciegas.

1. Entra a `search.google.com/search-console` y añade la propiedad `plateo.cloud`.
2. Verifica por DNS (un registro TXT donde tengas el dominio).
3. En *Sitemaps*, envía `sitemap-index.xml`.
4. En *Inspección de URL*, pega la home y pulsa **Solicitar indexación**. Repite
   con `/preguntas-frecuentes`.

Haz lo mismo en **Bing Webmaster Tools**: importa directo desde Search Console y
son cinco minutos. Bing es poco tráfico, pero es de donde ChatGPT saca resultados.

### 2. Google Business Profile — sí, deberías

**Respuesta corta: sí, créala, y no necesitas local comercial.**

Google permite las *empresas de área de servicio*: registras tu dirección para
verificarte y luego **la ocultas**, dejando visible solo la zona que atiendes
(Medellín y área metropolitana). Tu casa nunca aparece públicamente.

La letra pequeña honesta: Google pide que ese tipo de negocio tenga contacto
presencial con el cliente. En tu caso lo hay —vas al restaurante a montar el menú
y conectar el WhatsApp—, así que encaja. Descríbelo así en la ficha.

Por qué vale la pena: es el mayor multiplicador de SEO local en Colombia. Te mete
en el mapa, te da un canal de reseñas y aparece por búsquedas del tipo *«software
para restaurantes Medellín»* sin competir en el orgánico puro.

Qué poner:
- Categoría principal: *Proveedor de software* o *Servicio de consultoría de software*.
- Zona de servicio: Medellín, Envigado, Sabaneta, Itagüí, Bello.
- Fotos: capturas del panel, el logo, alguna del montaje en un restaurante.
- El enlace a `plateo.cloud`.

Y luego **pide reseñas a cada cliente**. Cinco reseñas reales valen más que
cualquier cosa que yo pueda escribir en el código.

### 3. Registrar la empresa — sí, y antes de pautar

No soy abogado ni contador, así que esto es orientación práctica, no asesoría:
para los pasos finales, un contador cuesta poco y evita errores caros.

Lo habitual en Colombia para un proyecto como este es una **SAS** (Sociedad por
Acciones Simplificada), que se puede constituir con **una sola persona**:

1. **Consulta el nombre** en el RUES (`rues.org.co`) para ver que «Plateo» esté
   libre como razón social.
2. **Redacta el documento privado de constitución** — la Cámara de Comercio de
   Medellín tiene modelos y trámite en línea.
3. **Regístrate en la Cámara de Comercio** de Medellín. Es el paso que cuesta
   dinero (matrícula mercantil, según el capital declarado).
4. **Saca el RUT** en la DIAN. Puede hacerse en línea.
5. **Abre una cuenta bancaria empresarial.**

Por qué importa para lo que estás haciendo:

- Puedes **facturar en legal** a los restaurantes. Un local que lleva contabilidad
  necesita factura electrónica; sin ella, tu cliente potencial más serio no te
  puede contratar.
- Google Ads y Meta piden datos fiscales para facturarte.
- Los contratos y la política de privacidad necesitan una razón social y un NIT
  reales. Ahora mismo `/privacidad` y `/terminos` los tienen como placeholder.
- Un restaurante que va a pagarte $490.000 al mes va a preguntar quién eres.

### 4. Contenido — el motor a largo plazo

Decidimos no hacer blog, y me parece bien para empezar. Pero si en algún momento
quieres crecer el orgánico de verdad, es por aquí, y basta con **un artículo al
mes** que responda una pregunta real:

- «Cuánto cuesta atender WhatsApp en un restaurante (y cuánto cuesta no atenderlo)»
- «Rappi vs. domicilio propio: la cuenta real de las comisiones»
- «Cómo montar la carta digital de tu restaurante sin una app»

Cuando toque, la infraestructura ya está: Astro trae Content Collections y solo
hay que crear `src/content/`.

### 5. Enlaces y menciones — gratis y desatendido

Cada uno de estos es un enlace y una señal de existencia:

- Directorios de software: **Capterra**, **GetApp**, **Software Advice**,
  **AppSumo**. Todos aceptan alta gratuita y posicionan muy bien en Colombia.
- **Product Hunt** el día del lanzamiento.
- Cámaras de comercio, ACODRES (gremio de restaurantes), grupos de gastronomía.
- Tu perfil de **LinkedIn** y el de la empresa, con el enlace.
- Instagram: el enlace en la bio ya existe. Que apunte a `plateo.cloud`.

---

## Parte 4 — Publicidad pagada

Dijiste que no importa pagar. Bien, pero el orden importa.

### Primero Meta (Instagram + Facebook), no Google

Contraintuitivo, y es por el volumen de búsqueda. En Colombia, *«agente de IA
para restaurantes»* lo busca casi nadie todavía: es una categoría que aún no
existe en la cabeza del cliente. No puedes pujar por una búsqueda que nadie hace.

En cambio, en Instagram puedes segmentar **por lo que la persona es**, no por lo
que busca: dueños de restaurante en Medellín y Bogotá, intereses de gastronomía y
negocio, 25-55 años.

- Presupuesto de arranque: **$500.000–$800.000 COP/mes**. Con menos no sales de la
  fase de aprendizaje del algoritmo.
- Creativo: el vídeo del agente tomando un pedido real por WhatsApp. Lo que tienes
  en `<LiveDemo />` grabado en pantalla. Eso vende solo.
- Objetivo de campaña: **mensajes a WhatsApp**, no tráfico a la web. Tu embudo
  vive en WhatsApp y ya tienes el número de demo.

### Después Google Ads, con las búsquedas que sí existen

No pujes por «agente de IA». Puja por el problema, que sí se busca:

| Grupo | Términos |
|---|---|
| Software | `software para restaurantes`, `programa para restaurantes`, `sistema de pedidos restaurante` |
| WhatsApp | `chatbot whatsapp`, `bot de whatsapp para negocios`, `whatsapp business api colombia` |
| Dolor | `alternativa a rappi`, `pedidos sin comisión`, `domicilios propios restaurante` |
| Local | los tres anteriores + `medellín` / `bogotá` / `colombia` |

- Presupuesto: **$400.000–$600.000 COP/mes** para empezar.
- Concordancia de frase, nunca amplia al principio: la amplia se come el
  presupuesto en clics de gente que buscaba otra cosa.
- Negativas desde el día uno: `gratis`, `curso`, `empleo`, `pdf`, `descargar`.
- Manda el tráfico a `/` y a `/preguntas-frecuentes`, que es la que ya responde
  las objeciones.

### Presupuesto realista de los primeros tres meses

| Concepto | Mensual |
|---|---|
| Meta Ads | $600.000 |
| Google Ads | $500.000 |
| **Total** | **$1.100.000 COP** |

Con un ticket de $490.000/mes y $690.000 de implementación, **un solo cliente
cerrado paga el mes de publicidad**. Esa es la cuenta que hay que vigilar.

---

## Parte 5 — Antes de gastar un peso en anuncios

Dos cosas bloquean todo lo demás:

1. **El testimonio de la home es inventado.** «Daniel V., Pollos Mario», las
   1.240 órdenes, el −70%: nada de eso existe. Está marcado en el código con un
   aviso, pero repito aquí porque es lo más serio del sitio. La SIC sanciona los
   testimonios que no se pueden sustentar, y tanto Google como Meta rechazan la
   cuenta de anuncios por publicidad engañosa. **O consigues un testimonio real
   con permiso escrito, o quitas `<Testimonial />` de `index.astro`.** Es una
   línea.

2. **`/privacidad` y `/terminos` son borradores.** Están bien redactados y cubren
   lo que piden las plataformas, pero les falta razón social y NIT, y no los ha
   visto un abogado.

---

## Parte 6 — Qué mirar cada mes

En Search Console, cuatro números y nada más:

- **Impresiones**: cuánta gente vio tu resultado. Es lo primero que se mueve.
- **Clics** y **CTR**: si hay impresiones y no hay clics, el problema es el
  título o la descripción, no el posicionamiento.
- **Posición media** por consulta: cuáles suben.
- **Páginas indexadas**: deberían ser 4. Si baja, algo se rompió.

Analítica del sitio: cuando toque, **Plausible** o **Umami** (~1 KB, sin cookies,
sin banner de consentimiento). No Google Analytics 4: pesa veinte veces más,
obliga a poner el banner y te da datos que a esta escala no vas a usar.

---

### Resumen de esta semana

- [ ] Apuntar `plateo.cloud` a Vercel y desplegar
- [ ] Search Console + enviar sitemap + solicitar indexación
- [ ] Bing Webmaster Tools
- [ ] Decidir qué pasa con el testimonio inventado
- [ ] Empezar el trámite de la SAS en la Cámara de Comercio
- [ ] Crear la ficha de Google Business Profile
- [ ] Alta en Capterra y GetApp
