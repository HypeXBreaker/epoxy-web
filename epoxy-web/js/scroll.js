/* js/scroll.js
   - Reveal elements with .fade-up when they appear in viewport
   - Lightweight, uses IntersectionObserver (fast)
*/

(function () {
  function initReveal() {
    const items = document.querySelectorAll('.fade-up');

    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class, also keep it visible (unobserve)
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.18
    });

    items.forEach(el => observer.observe(el));
  }

  document.addEventListener('DOMContentLoaded', initReveal);
})();
