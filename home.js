const years = [2025, 2024, 2023, 2022, 2021]; // Məsələn, son 5 ili göstəririk
const makes = ['Toyota', 'BMW', 'Mercedes', 'Audi'];
const models = {
  'Toyota': ['Corolla', 'Camry', 'RAV4'],
  'BMW': ['3 Series', '5 Series', 'X5'],
  'Mercedes': ['C-Class', 'E-Class', 'GLE'],
  'Audi': ['A4', 'Q5', 'A6']
};

function populateSelect(selectElement, options) {
  selectElement.innerHTML = ''; // Mövcud seçimləri təmizləyirik
  options.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option;
    opt.textContent = option;
    selectElement.appendChild(opt);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const yearSelect = document.getElementById('year');
  const makeSelect = document.getElementById('make');
  const modelSelect = document.getElementById('model');

  populateSelect(yearSelect, years);
  populateSelect(makeSelect, makes);

  makeSelect.addEventListener('change', () => {
    const selectedMake = makeSelect.value;
    const availableModels = models[selectedMake] || [];
    populateSelect(modelSelect, availableModels);
  });
});
const container = document.getElementById('new_products');

fetch('products.json')
  .then(res => res.json())
  .then(data => {
    data.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('product-card');

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">${product.price}</p>
        <p class="description">${product.description}</p>
        <button onclick="addToCart()">Səbətə əlavə et</button>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => console.error('Məhsullar alınmadı:', err));

 function openMenu() {
      document.getElementById("mySidebar").style.width = "250px";
    }

    function closeMenu() {
      document.getElementById("mySidebar").style.width = "0";
    }
let cartCount = 0;

function addToCart() {
  cartCount++;
  const cartBadge = document.getElementById("cart-count");
  if (cartCount > 0) {
    cartBadge.classList.remove("hidden");
    cartBadge.innerText = cartCount;
  }
}
 // cart.js

// Səbəti localStorage-dan götür, yoxdursa boş array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Məhsul əlavə etmək funksiyası
function addToCart(product) {
    // Əgər məhsul artıq varsa, sayını artır
    let existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += product.quantity || 1;
    } else {
        product.quantity = product.quantity || 1;
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Səbət:", cart);
    showCart(); // səhifədə göstərin
}

// Məhsulları ekranda göstərmək funksiyası
function showCart() {
    let cartContainer = document.getElementById("cart-container");
    if (!cartContainer) return;

    cartContainer.innerHTML = ""; // əvvəlki məhsulları təmizlə
    cart.forEach(item => {
        let div = document.createElement("div");
        div.innerHTML = `
            ${item.name} - ${item.price} AZN x ${item.quantity}
            <button onclick="removeFromCart(${item.id})">Sil</button>
        `;
        cartContainer.appendChild(div);
    });
}

// Məhsulu səbətdən silmək
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
}

// Səhifə açılanda səbəti göstər
window.addEventListener("DOMContentLoaded", () => {
    showCart();
});
