document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('new_products');
  let products = [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Cart sayını yenilə
  function updateCartCount() {
    const cartBadge = document.getElementById("cart-count");
    if (!cartBadge) return;
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalQuantity;
    cartBadge.classList.toggle('hidden', totalQuantity === 0);
  }
  updateCartCount();

  // Səbətə əlavə etmə funksiyası
  function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) existing.quantity++;
    else { product.quantity = 1; cart.push(product); }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} səbətə əlavə olundu!`);
  }

  // Məhsulları render funksiyası
  function renderProducts(items) {
    if (!container) return;
    container.innerHTML = '';
    if (items.length === 0) {
      container.innerHTML = `<p class="no-products">Heç bir məhsul tapılmadı 😢</p>`;
      return;
    }
    items.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">${product.price} AZN</p>
        <p class="description">${product.description}</p>
        <button class="add-to-cart">Səbətə əlavə et</button>
      `;
      container.appendChild(card);

      // Buttona event listener əlavə et
      card.querySelector('.add-to-cart').addEventListener('click', () => addToCart(product));
    });
  }

  // Məhsulları fetch et
  fetch('json/new_products.json')
    .then(res => res.json())
    .then(data => {
      products = data;
      renderProducts(products);

      // Sidebar linkləri üçün yönləndirmə 
      const sidebarLinks = document.querySelectorAll('.sidebar a');
      sidebarLinks.forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault();
          const categoryText = link.textContent.trim().toLowerCase();

          // Filtrlənəcək kateqoriyanı localStorage-də saxla
          localStorage.setItem('selectedCategory', categoryText);

          // home.html səhifəsinə yönləndir
          window.location.href = 'home.html';
        });
      });


      // Məhsul adı ilə axtarış
      const nameSearchInput = document.getElementById('nameSearchInput');
      const nameSearchBtn = document.getElementById('nameSearchBtn');
      if (nameSearchBtn) {
        nameSearchBtn.addEventListener('click', () => {
          const query = nameSearchInput.value.trim().toLowerCase();
          if (!query) { renderProducts(products); return; }

          // Axtarış sorğusunu localStorage-də saxla
          localStorage.setItem('searchQuery', query);

          // home.html-ə yönləndir
          window.location.href = 'home.html';
        });
      }

      if (nameSearchInput) {
        nameSearchInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') { e.preventDefault(); nameSearchBtn?.click(); }
        });
      }
    })
    .catch(err => console.error('Məhsullar alınmadı:', err));
});
// ----------- Sidebar Menu -------------
function openMenu() {
  document.getElementById("mySidebar").style.width = "250px";
  document.body.style.overflow = "hidden"; // Scrollu blokla
}

function closeMenu() {
  document.getElementById("mySidebar").style.width = "0";
  document.body.style.overflow = ""; // Scrollu bərpa et
}

// ESC düyməsi ilə bağlama
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});




