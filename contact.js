// İndiki ili footer-a qoymaq
document.getElementById('year').textContent = new Date().getFullYear();

// Form göndərmə funksiyası
function submitForm(event) {
  event.preventDefault(); // Formun default göndərilməsini dayandırır

  const btn = document.getElementById('sendBtn');
  const status = document.getElementById('status');

  // Göndərmə zamanı düyməni deaktiv et və mesaj göstər
  btn.disabled = true;
  btn.textContent = 'Göndərilir...';

  // 900ms sonra demo mesaj göstər
  setTimeout(() => {
    status.style.display = 'block';
    btn.disabled = false;
    btn.textContent = 'Göndər';
    event.target.reset(); // Formu sıfırla
  }, 900);

  return false; 
}
function updateCartCount() {
  const cartBadge = document.getElementById("cart-count");
  if (!cartBadge) return; // element yoxdursa çıx

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (totalQuantity > 0) {
    cartBadge.textContent = totalQuantity;
    cartBadge.classList.remove("hidden");
  } else {
    cartBadge.classList.add("hidden");
  }
}

// Page load zamanı hər səhifədə çağır
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM hazır olduqda
document.addEventListener("DOMContentLoaded", () => {
    const nameSearchInput = document.getElementById('nameSearchInput');
    const nameSearchBtn = document.getElementById('nameSearchBtn');

    // Products fetch
    fetch('new_products.json')
      .then(res => res.json())
      .then(data => {
          products = data;
          // Əgər home.html-də açılıbsa searchResults varsa göstər
          const results = JSON.parse(localStorage.getItem("searchResults") || "[]");
          if(results.length > 0){
            renderProducts(results);
            localStorage.removeItem("searchResults");
          } else {
            renderProducts(products);
          }
      });

    // Search funksiyası
    if(nameSearchInput && nameSearchBtn){
        const handleSearch = () => {
            const query = nameSearchInput.value.trim().toLowerCase();
            if(!query) return;
            const filtered = products.filter(p =>
                p.name.toLowerCase().includes(query) ||
                (p.description && p.description.toLowerCase().includes(query))
            );
            localStorage.setItem("searchResults", JSON.stringify(filtered));
            window.location.href = "home.html";
        };

        nameSearchBtn.addEventListener("click", handleSearch);
        nameSearchInput.addEventListener("keypress", e => {
            if(e.key === "Enter"){
                e.preventDefault();
                handleSearch();
            }
        });
    }
});

// Render function
function renderProducts(items){
    const container = document.getElementById('new_products');
    if(!container) return;
    container.innerHTML = '';
    items.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${product.price} AZN</p>
            <p class="description">${product.description}</p>
            <button onclick="addToCart()">Səbətə əlavə et</button>
        `;
        container.appendChild(card);
    });
}



