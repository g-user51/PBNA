document.addEventListener('DOMContentLoaded', () => {
  const productGrid = document.getElementById('product-grid');
  const productData = window.drinkooProducts || [];
  const prevButton = document.querySelector('[data-action="prev"]');
  const nextButton = document.querySelector('[data-action="next"]');

  if (!productGrid || !productData.length) return;

  let currentPage = 0;
  const pageSize = 6;

  function renderPage() {
    const start = currentPage * pageSize;
    const visibleProducts = productData.slice(start, start + pageSize);
    const cards = visibleProducts.map((product) => `
      <article class="product-card">
        <div class="product-badge">${product.category}</div>
        <h3>${product.name}</h3>
        <p>${product.shortDescription}</p>
        <div class="product-meta">
          <span>${product.sizeMl} ml</span>
          <span>₹${product.price}</span>
        </div>
        <a class="button" href="/sku/${product.slug}">View Details</a>
      </article>
    `).join('');
    productGrid.innerHTML = cards;
    prevButton.disabled = currentPage === 0;
    nextButton.disabled = start + pageSize >= productData.length;
  }

  prevButton?.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage -= 1;
      renderPage();
    }
  });

  nextButton?.addEventListener('click', () => {
    if ((currentPage + 1) * pageSize < productData.length) {
      currentPage += 1;
      renderPage();
    }
  });

  renderPage();
});
