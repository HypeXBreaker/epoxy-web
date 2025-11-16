/* js/product.js */

(async function () {
  const DATA_PATH = 'data/products.json';

  const params = new URLSearchParams(location.search);
  const pid = params.get('id');

  const res = await fetch(DATA_PATH);
  const data = await res.json();

  const product = data.find(p => p.id === pid);

  if (!product) {
    document.body.innerHTML = "<h2 style='text-align:center;'>Product not found</h2>";
    return;
  }

  document.getElementById('p-image').src = product.image;
  document.getElementById('p-title').textContent = product.title;
  document.getElementById('p-desc').textContent = product.description;
  document.getElementById('p-price').textContent = product.price;

  document.getElementById('buy-btn').onclick = () => {
    alert(`To purchase "${product.title}", contact us from the contact page!`);
  };
})();
