/* js/ui.js
   Small UI helpers: close product detail on ESC, collapse mobile nav on route click.
*/

(function () {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const detail = document.getElementById('product-detail');
      if (detail && !detail.classList.contains('hidden')) {
        detail.classList.add('hidden');
        history.replaceState(null, '', 'shop.html');
      }
    }
  });

  // collapse mobile nav after clicking a nav link
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.tagName === 'A') {
      const nav = document.querySelector('.main-nav');
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        const btn = document.querySelector('.nav-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    }
  });
})();
