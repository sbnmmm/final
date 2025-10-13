// ----------- Car Filters -------------
const years = [2004, 2005, 2006, 2007, 2009, 2010, 2011, 2012, 2014, 2017];
const makes = ['Toyota', 'Kia', 'Hyundai', 'Byd'];
const models = {
  'Toyota': ['Prius', 'C7R', 'Yaris', '20 Kuza', '30 Kuza'],
  'Kia': ['Rio', 'Sportage', 'Ceed'],
  'Hyundai': ['Tucson', 'Accent', 'i30', 'Getz', 'Santa Fe'],
  'Byd': ['Accent', 'Genesis', 'Destroyer']

};

function populateSelect(selectElement, options) {
  selectElement.innerHTML = '';
  const defaultOpt = document.createElement('option');
  defaultOpt.value = '';
  defaultOpt.textContent = 'Hamısı';
  selectElement.appendChild(defaultOpt);

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
  if (existing) existing.quantity++;
  else {
    product.quantity = 1;
    cart.push(product);
  }
  saveCart(cart);
  showToast(`${product.name} səbətə əlavə olundu!`);

  updateCartCount();
}
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  // animasiya ilə göstər
  setTimeout(() => toast.classList.add('show'), 100);

  // 2 saniyə sonra gizlət
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, 2000);
}

function updateCartCount() {
  const cart = getCart();
  const cartCount = document.getElementById('cart-count');
  if (!cartCount) return;

  const total = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.textContent = total;
  cartCount.classList.toggle('hidden', total === 0);
}

// ----------- Sidebar Menu -------------
function openMenu() { document.getElementById("mySidebar").style.width = "250px"; }
function closeMenu() { document.getElementById("mySidebar").style.width = "0"; }

// ----------- Products & Render Function -------------
let allProducts = [];

function renderProducts(products) {
  const container = document.getElementById('new_products');
  if (!container) return;
  container.innerHTML = '';

  if (!products.length) {
    container.innerHTML = `<p class="no-products">Heç bir məhsul tapılmadı 😢</p>`;
    return;
  }

  products.forEach(product => {
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
    card.querySelector('.add-to-cart').addEventListener('click', () => addToCart(product));
  });
}

// ----------- DOM Loaded -------------
document.addEventListener('DOMContentLoaded', () => {
  const yearSelect = document.getElementById('year');
  const makeSelect = document.getElementById('make');
  const modelSelect = document.getElementById('model');

  // Filter dropdownları
  if (yearSelect && makeSelect && modelSelect) {
    populateSelect(yearSelect, years);
    populateSelect(makeSelect, makes);

    makeSelect.addEventListener('change', () => {
      const selectedMake = makeSelect.value;
      const availableModels = models[selectedMake] || [];
      populateSelect(modelSelect, availableModels);
    });
  }

  // İstifadəçi salamı
  const userData = JSON.parse(localStorage.getItem("loggedInUser"));
  const userDisplay = document.getElementById("userDisplay");
  if (userData && userDisplay) {
    userDisplay.textContent = `Salam, ${userData.firstName}`;
  }

  // Səbət sayını yenilə
  updateCartCount();

  // Məhsulları yüklə
  const container = document.getElementById('new_products');
  if (!container) return;

  fetch('json/products.json')
    .then(res => res.json())
    .then(data => {
      allProducts = data;
      renderProducts(allProducts);

      // ----------- Car Filter Axtarışı -------------
      const searchBtn = document.getElementById('searchBtn');
      if (searchBtn) {
        searchBtn.addEventListener('click', () => {
          const year = document.getElementById('year')?.value;
          const make = document.getElementById('make')?.value;
          const model = document.getElementById('model')?.value;

          const filtered = allProducts.filter(p => {
            const matchYear = !year || !p.year || (Array.isArray(p.year) ? p.year.includes(Number(year)) : p.year == year);
            let matchMake = false;
            if (!make) matchMake = true;
            else if (Array.isArray(p.make)) matchMake = p.make.map(m => m.toLowerCase()).includes(make.toLowerCase());
            else matchMake = p.make.toLowerCase() === make.toLowerCase();

            const matchModel = !model || (p.model && (
              Array.isArray(p.model)
                ? p.model.map(m => m.toLowerCase()).includes(model.toLowerCase())
                : p.model.toLowerCase() === model.toLowerCase()
            ));

            return matchYear && matchMake && matchModel;
          });

          renderProducts(filtered.length ? filtered : []);
        });
      }

      // Sidebar kateqoriya filterləri
      const sidebarLinks = document.querySelectorAll('.sidebar a');
      sidebarLinks.forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault();

          const categoryText = link.textContent.trim().toLowerCase();
          const filtered = allProducts.filter(p =>
            p.category && p.category.toLowerCase() === categoryText
          );

          renderProducts(filtered);

          // 🔹 Sidebar avtomatik bağlansın
          closeMenu();
        });
      });

      // Məhsul adı ilə axtarış
      const nameSearchBtn = document.getElementById('nameSearchBtn');
      if (nameSearchBtn) {
        nameSearchBtn.addEventListener('click', () => {
          const query = document.getElementById('nameSearchInput')?.value.trim().toLowerCase();
          if (!query) { renderProducts(allProducts); return; }

          const filtered = allProducts.filter(p =>
            p.name.toLowerCase().includes(query) ||
            (p.description && p.description.toLowerCase().includes(query))
          );
          renderProducts(filtered.length ? filtered : []);
        });
      }
      // Enter ilə axtarış (yenilənmədən)
      const nameSearchInput = document.getElementById('nameSearchInput');
      if (nameSearchInput) {
        nameSearchInput.addEventListener('keydown', e => {
          if (e.key === 'Enter') {
            e.preventDefault(); // səhifə refresh olmasın
            document.getElementById('nameSearchBtn')?.click(); // eyni funksiyanı işə sal
          }
        });
      }
      
    })
    .catch(err => console.error('Məhsullar alınmadı:', err));
});
// ----------- Search & Category Results Loader -------------
document.addEventListener("DOMContentLoaded", () => {
  fetch('json/products.json')
    .then(res => res.json())
    .then(data => {
      allProducts = data;

      // Axtarış nəticəsi və ya kateqoriya varsa göstər
      const selectedCategory = localStorage.getItem("selectedCategory");
      const searchResults = JSON.parse(localStorage.getItem("searchResults") || "[]");

      if (selectedCategory) {
        const filtered = allProducts.filter(p =>
          p.category && p.category.toLowerCase() === selectedCategory.toLowerCase()
        );
        renderProducts(filtered);
        localStorage.removeItem("selectedCategory");
        return;
      }

      if (searchResults.length > 0) {
        renderProducts(searchResults);
        localStorage.removeItem("searchResults");
        return;
      }

      // Əgər heç biri yoxdursa, bütün məhsulları göstər
      renderProducts(allProducts);
    })
    .catch(err => console.error("Məhsullar yüklənmədi:", err));
});

