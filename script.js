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
        <button>Səbətə əlavə et</button>
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








