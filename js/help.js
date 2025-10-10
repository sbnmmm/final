// Tab Switching Functionality
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const sections = document.querySelectorAll('.section');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Show/hide sections
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetTab) {
                    section.classList.add('active');
                }
            });
        });
    });
}

// FAQ Accordion Functionality
function setupFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const arrow = this.querySelector('.arrow');

            // Toggle answer visibility
            answer.classList.toggle('active');

            // Rotate arrow
            if (arrow) {
                arrow.classList.toggle('rotated');
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupTabs();
    setupFAQAccordion();
    
    console.log('Policy page initialized successfully');
});

// Optional: Add smooth scrolling for better UX
function smoothScrollToElement(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Export functions if needed for other scripts
window.policyPage = {
    setupTabs,
    setupFAQAccordion,
    smoothScrollToElement};

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

fetch('json/new_products.json')
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


let cartCount = 0;

function addToCart() {
  cartCount++;
  const cartBadge = document.getElementById("cart-count");
  if (cartCount > 0) {
    cartBadge.classList.remove("hidden");
    cartBadge.innerText = cartCount;
  }
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
  }}

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
