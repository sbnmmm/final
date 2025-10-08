let products = [];

fetch('products.json')
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts();
    updateCartCount();
  });

function renderProducts() {
  const container = document.getElementById('products-container');
  container.innerHTML = '';
  products.forEach(p => {
    const div = document.createElement('div');
    div.classList.add('product-item');
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>${p.price} ₼</p>
      <button onclick="addToCart(${p.id})">Səbətə əlavə et</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(c => c.id === id);
  if (existing) existing.quantity += 1;
  else cart.push({...product, quantity: 1, date: new Date()});

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} səbətə əlavə olundu!`);
  updateCartCount();
}

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length > 0) {
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.classList.remove('hidden');
  } else {
    cartCount.classList.add('hidden');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});

function renderCart() {
  const cartContainer = document.getElementById("cart-container");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="empty-cart">Səbət boşdur 🛒</p>`;
    return;
  }

  cartContainer.innerHTML = "";
  let totalPrice = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;
    const currentDate = new Date(item.date).toLocaleDateString("az-AZ");

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="item-details">
        <div class="item-name">${item.name}</div>
        <div class="item-price">${item.price} ₼</div>
      </div>
      <div class="quantity-controls">
        <button class="decrease-btn">−</button>
        <div class="quantity-number">${item.quantity}</div>
        <button class="increase-btn">+</button>
      </div>
      <div class="item-total">${itemTotal.toFixed(2)} ₼</div>
      <button class="remove-btn">&times;</button>
      <div class="cart-date">Sifariş tarixi: ${currentDate}</div>
    `;
    cartContainer.appendChild(div);
  });

  const summary = document.createElement("div");
  summary.classList.add("cart-summary");
  summary.textContent = `Cəmi: ${totalPrice.toFixed(2)} ₼`;
  cartContainer.appendChild(summary);

  document.querySelectorAll(".increase-btn").forEach(btn => {
    btn.addEventListener("click", e => changeQuantity(e, 1));
  });
  document.querySelectorAll(".decrease-btn").forEach(btn => {
    btn.addEventListener("click", e => changeQuantity(e, -1));
  });
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", e => removeItem(e));
  });

  updateCartCount();
}

function changeQuantity(e, delta) {
  const itemDiv = e.target.closest(".cart-item");
  const name = itemDiv.querySelector(".item-name").textContent;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find(i => i.name === name);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity < 1) item.quantity = 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(e) {
  const itemDiv = e.target.closest(".cart-item");
  const name = itemDiv.querySelector(".item-name").textContent;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(i => i.name !== name);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}






