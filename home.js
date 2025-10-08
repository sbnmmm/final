// ----------- Car Filters -------------
const years = [2025, 2024, 2023, 2022, 2021];
const makes = ['Toyota', 'BMW', 'Mercedes', 'Audi'];
const models = {
  'Toyota': ['Corolla', 'Camry', 'RAV4'],
  'BMW': ['3 Series', '5 Series', 'X5'],
  'Mercedes': ['C-Class', 'E-Class', 'GLE'],
  'Audi': ['A4', 'Q5', 'A6']
};

function populateSelect(selectElement, options) {
  selectElement.innerHTML = '';
  options.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option;
    opt.textContent = option;
    selectElement.appendChild(opt);
  });
}

// ----------- Cart Functions -------------
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  let cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if(existing) existing.quantity++;
  else {
    product.quantity = 1;
    cart.push(product);
  }
  saveCart(cart);
  alert(`${product.name} səbətə əlavə olundu!`);
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const cartCount = document.getElementById('cart-count');
  if(!cartCount) return;

  const total = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.textContent = total;
  cartCount.classList.toggle('hidden', total === 0);
}

// ----------- Sidebar Menu -------------
function openMenu() {
  document.getElementById("mySidebar").style.width = "250px";
}

function closeMenu() {
  document.getElementById("mySidebar").style.width = "0";
}

// ----------- Load Products & Sidebar Filter -------------
let allProducts = [];

document.addEventListener('DOMContentLoaded', () => {
  const yearSelect = document.getElementById('year');
  const makeSelect = document.getElementById('make');
  const modelSelect = document.getElementById('model');

  // Car filters
  if(yearSelect && makeSelect && modelSelect){
    populateSelect(yearSelect, years);
    populateSelect(makeSelect, makes);

    makeSelect.addEventListener('change', () => {
      const selectedMake = makeSelect.value;
      const availableModels = models[selectedMake] || [];
      populateSelect(modelSelect, availableModels);
    });
  }

  // Display logged in user
  const userData = JSON.parse(localStorage.getItem("loggedInUser"));
  const userDisplay = document.getElementById("userDisplay");
  if (userData && userDisplay) {
    userDisplay.textContent = `Salam, ${userData.firstName}`;
  }

  // Update cart count
  updateCartCount();

  // Load products
  const container = document.getElementById('new_products');
  if(!container) return;

  fetch('products.json')
    .then(res => res.json())
    .then(data => {
      allProducts = data;
      renderProducts(allProducts);

      // Sidebar event-lərini qururuq
      const sidebarLinks = document.querySelectorAll('.sidebar a');
      sidebarLinks.forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault();
          const categoryText = link.textContent.trim().toLowerCase();

          // Filter products by category
          const filtered = allProducts.filter(p => p.category && p.category.toLowerCase() === categoryText);

          renderProducts(filtered);
        });
      });
    })
    .catch(err => console.error('Məhsullar alınmadı:', err));

  // Render Products function
  function renderProducts(products) {
    container.innerHTML = '';
    products.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">${product.price} AZN</p>
        <p class="description">${product.description}</p>
        <button class="add-to-cart">Səbətə əlavə et</button>`;
      container.appendChild(card);

      
      card.querySelector('.add-to-cart').addEventListener('click', () => addToCart(product));
    });
  }
});



