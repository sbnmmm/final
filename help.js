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
    smoothScrollToElement
};

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

fetch('new_products.json')
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
