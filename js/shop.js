/* js/shop.js */

(function () {
  const DATA_PATH = 'data/products.json';
  const gridEl = document.getElementById('product-grid');

  async function fetchProducts() {
    try {
      const res = await fetch(DATA_PATH);
      if (!res.ok) throw new Error('Failed to fetch products.json');
      return await res.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  function renderGrid(products) {
    if (!gridEl) return;
    gridEl.innerHTML = '';

    products.forEach(p => {
      const card = document.createElement('article');
      card.className = 'product-card fade-up';

      card.innerHTML = `
        <img src="${p.image}" alt="${p.title}">
        <h4>${p.title}</h4>
        <p>${p.short}</p>
        <div class="small">Price: ${p.price}</div>
      `;

      // ⭐ UPDATED: redirect to product.html
      card.addEventListener('click', () => {
        location.href = `product.html?id=${p.id}`;
      });

      gridEl.appendChild(card);
    });
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const products = await fetchProducts();
    renderGrid(products);
  });
})();
