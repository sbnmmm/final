// İndiki ili footer-a qoymaq
document.getElementById('year').textContent = new Date().getFullYear();

// Form göndərmə funksiyası
function submitForm(event) {
  event.preventDefault();
  const btn = document.getElementById('sendBtn');
  const status = document.getElementById('status');

  btn.disabled = true;
  btn.textContent = 'Göndərilir...';

  setTimeout(() => {
    status.style.display = 'block';
    btn.disabled = false;
    btn.textContent = 'Göndər';
    event.target.reset();
  }, 900);

  return false;
}

// 🛒 Səbət sayını yenilə
function updateCartCount() {
  const cartBadge = document.getElementById("cart-count");
  if (!cartBadge) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (totalQuantity > 0) {
    cartBadge.textContent = totalQuantity;
    cartBadge.classList.remove("hidden");
  } else {
    cartBadge.classList.add("hidden");
  }
}

// DOM hazır olduqda
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  const nameSearchInput = document.getElementById('nameSearchInput');
  const nameSearchBtn = document.getElementById('nameSearchBtn');

  // Məhsulları fetch et
  fetch('json/new_products.json')
    .then(res => res.json())
    .then(data => {
      let products = data;

      // 🔹 1. Əgər home.html açılıbsa və localStorage-də filter məlumatı varsa:
      const results = JSON.parse(localStorage.getItem("searchResults") || "[]");
      const selectedCategory = localStorage.getItem("selectedCategory");
      const container = document.getElementById('new_products');

      if (results.length > 0) {
        renderProducts(results);
        localStorage.removeItem("searchResults");
      } else if (selectedCategory) {
        const filtered = products.filter(p =>
          p.category && p.category.toLowerCase() === selectedCategory
        );
        renderProducts(filtered);
        localStorage.removeItem("selectedCategory");
      } else {
        renderProducts(products);
      }

      // 🔹 2. Sidebar linkləri üçün kateqoriya yönləndirmə
      const sidebarLinks = document.querySelectorAll('.sidebar a');
      sidebarLinks.forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault();
          const categoryText = link.textContent.trim().toLowerCase();

          // Filtrlənəcək kateqoriyanı saxla və home.html-ə yönləndir
          localStorage.setItem('selectedCategory', categoryText);
          window.location.href = 'home.html';
        });
      });

      // 🔹 3. Ada görə axtarış
      if (nameSearchInput && nameSearchBtn) {
        const handleSearch = () => {
          const query = nameSearchInput.value.trim().toLowerCase();
          if (!query) return;
          const filtered = products.filter(p =>
            p.name.toLowerCase().includes(query) ||
            (p.description && p.description.toLowerCase().includes(query))
          );
          // Filterlənən nəticələri saxla və home.html-ə yönləndir
          localStorage.setItem("searchResults", JSON.stringify(filtered));
          window.location.href = "home.html";
        };

        nameSearchBtn.addEventListener("click", handleSearch);
        nameSearchInput.addEventListener("keypress", e => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
          }
        });
      }
    })
    .catch(err => console.error('Məhsullar alınmadı:', err));
});

// 🔹 Məhsulları göstərən funksiya
function renderProducts(items) {
  const container = document.getElementById('new_products');
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
      <button onclick="addToCart(${product.id})">Səbətə əlavə et</button>
    `;
    container.appendChild(card);
  });
}

// 🛒 Səbət funksiyası
function addToCart(productId) {
  const products = JSON.parse(localStorage.getItem("new_products")) || [];
  const product = products.find(p => p.id === productId);
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.id === product.id);
  if (existing) existing.quantity++;
  else {
    product.quantity = 1;
    cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} səbətə əlavə olundu!`);
}

// ----------- Sidebar Menu -------------
function openMenu() {
  document.getElementById("mySidebar").style.width = "250px";
  document.body.style.overflow = "hidden";
}
function closeMenu() {
  document.getElementById("mySidebar").style.width = "0";
  document.body.style.overflow = "";
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});





