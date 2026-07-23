/**
 * Scroll reveal: un único IntersectionObserver para toda la página.
 * Solo añade la clase; la animación es 100% CSS (ver global.css).
 * Deja de observar tras revelar — no re-anima al volver a subir.
 */
const REVEAL_SELECTOR = '[data-reveal]';

function initReveal() {
  const targets = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
  if (targets.length === 0) return;

  // Sin soporte de IO (o con reduced-motion) no hay nada que hacer:
  // el CSS ya deja el contenido visible.
  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    },
    {
      // Dispara un poco antes de que el elemento toque el borde inferior,
      // así la animación termina cuando el usuario ya lo está mirando.
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.05,
    },
  );

  targets.forEach((el) => observer.observe(el));
}

initReveal();

// Compatibilidad con View Transitions si algún día se activa <ClientRouter />.
document.addEventListener('astro:page-load', initReveal);
