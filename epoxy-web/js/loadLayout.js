/* js/loadLayout.js
   - Fetch partials/header.html and partials/footer.html and inject them
   - After injection, mark current nav link active, add simple mobile toggle
   NOTE: This uses fetch so serve over HTTP (Live Server or python -m http.server)
*/

(function () {
  // helper fetch and inject
  async function inject(url, selector) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch ' + url);
      const html = await res.text();
      document.querySelector(selector).innerHTML = html;
    } catch (err) {
      console.error(err);
      // fallback minimal content
      if (selector === '#site-header') {
        document.querySelector(selector).innerHTML = '<header class="site-header"><div class="container"><a class="brand" href="index.html">Epoxy Lovers</a></div></header>';
      } else if (selector === '#site-footer') {
        document.querySelector(selector).innerHTML = '<footer class="site-footer"><div class="container"><p>© Epoxy Lovers</p></div></footer>';
      }
    }
  }

  // highlight active link
  function markActive() {
    const path = location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(a => {
      const hrefFile = a.getAttribute('href').split('/').pop();
      if (hrefFile === path) a.classList.add('active');
      else a.classList.remove('active');
    });
  }

  // mobile toggle
  function addNavToggle() {
    const btn = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.main-nav');
    if (!btn || !nav) return;
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  // run injection on DOM ready
  document.addEventListener('DOMContentLoaded', async () => {
    await inject('partials/header.html', '#site-header');
    await inject('partials/footer.html', '#site-footer');
    markActive();
    addNavToggle();
    // set year in footer if present
    const y = new Date().getFullYear();
    const elYear = document.getElementById('year');
    if (elYear) elYear.textContent = y;
  });
})();
