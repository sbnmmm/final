// Tab Switching Functionality
function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const sections = document.querySelectorAll('.section');

  tabButtons.forEach(button => {
    button.addEventListener('click', function () {
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
    question.addEventListener('click', function () {
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
document.addEventListener('DOMContentLoaded', function () {
  setupTabs();
  setupFAQAccordion();
  updateCartCount(); // ✅ səhifə açılan kimi səbət sayını göstər
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
  smoothScrollToElement
};

// Populate selects (year, make, model)
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

// Məhsulların göstərilməsi
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
        <button onclick="addToCart('${product.name}')">Səbətə əlavə et</button>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => console.error('Məhsullar alınmadı:', err));


// ✅ Səbət funksiyaları
function addToCart(productName) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(item => item.name === productName);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name: productName, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

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

// ----------- Search by Product Name -------------
const nameSearchInput = document.getElementById('nameSearchInput');
const nameSearchBtn = document.getElementById('nameSearchBtn');

if (nameSearchInput && nameSearchBtn) {
  const handleSearch = () => {
    const query = nameSearchInput.value.trim().toLowerCase();
    if (!query) return;

    // Axtarış sorğusunu yadda saxla
    localStorage.setItem("searchQuery", query);

    // home.html səhifəsinə yönləndir
    window.location.href = "home.html";
  };

  nameSearchBtn.addEventListener("click", handleSearch);
  nameSearchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  });
}
