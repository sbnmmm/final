let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Product-ları fetch edirik
fetch('products.json')
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts();
    updateCartCount();
    showCart();
  });

// Products render funksiyası
function renderProducts() {
  const container = document.getElementById('products-container');
  if(!container) return;
  container.innerHTML = '';
  products.forEach(p => {
    const div = document.createElement('div');
    div.classList.add('product-item');
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>${p.price} AZN</p>
      <button onclick="addToCart(${p.id})">Səbətə əlavə et</button>
    `;
    container.appendChild(div);
  });
}

// Cart count update
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  if(total > 0){
    cartCount.textContent = total;
    cartCount.classList.remove('hidden');
  } else {
    cartCount.classList.add('hidden');
  }
}

// Cart render funksiyası
function showCart() {
  const cartContainer = document.getElementById("cart-items");
  if(!cartContainer) return;

  cartContainer.innerHTML = "";

  if(cart.length === 0) {
    cartContainer.innerHTML = `<p class="empty-cart">Səbət boşdur 🛒</p>`;
  } else {
    let totalPrice = 0;
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      totalPrice += itemTotal;

      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <img src="${item.image}" class="item-image">
        <div class="item-details">
          <div class="item-name">${item.name}</div>
          <div class="item-price">${item.price} AZN</div>
        </div>
        <div class="quantity-controls">
          <button onclick="decreaseQuantity(${index})">−</button>
          <span class="quantity-number">${item.quantity}</span>
          <button onclick="increaseQuantity(${index})">+</button>
        </div>
        <div class="item-total">${itemTotal.toFixed(2)} AZN</div>
        <button class="remove-btn" onclick="removeFromCart(${index})">&times;</button>
      `;
      cartContainer.appendChild(div);
    });

    const summary = document.createElement("div");
    summary.classList.add("cart-summary");
    summary.textContent = `Cəmi: ${totalPrice.toFixed(2)} AZN`;
    cartContainer.appendChild(summary);
  }

  toggleCompleteButton();
  updateCartCount();
}

// Cart funksiyaları
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if(!product) return;

  const existing = cart.find(c => c.id === id);
  if(existing) existing.quantity++;
  else cart.push({...product, quantity:1});

  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}

function increaseQuantity(index){
  cart[index].quantity++;
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}

function decreaseQuantity(index){
  if(cart[index].quantity > 1){
    cart[index].quantity--;
  } else {
    cart.splice(index,1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}

function removeFromCart(index){
  cart.splice(index,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}

// Sifarişi tamamla buttonu
const cartContainer = document.getElementById("cart-items");
const completeBtn = document.createElement("button");
completeBtn.textContent = "Sifarişi tamamla";
completeBtn.style.cssText = `
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #de1f26;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
completeBtn.addEventListener("click", () => {
  alert("Sifarişiniz qeydə alındı!");
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
});

function toggleCompleteButton() {
  if(cart.length > 0){
    if(!cartContainer.contains(completeBtn)) cartContainer.appendChild(completeBtn);
  } else {
    if(cartContainer.contains(completeBtn)) cartContainer.removeChild(completeBtn);
  }
}

// Page load zamanı
document.addEventListener("DOMContentLoaded", () => {
  showCart();
  updateCartCount();
});





