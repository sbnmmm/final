// ======================
// İstifadəçi idarəsi
// ======================
function getUser() {
  return localStorage.getItem("user");
}

function setUser(username) {
  localStorage.setItem("user", username);
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// ======================
// Qeydiyyat
// ======================
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", e => {
    e.preventDefault();
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;
    localStorage.setItem("userData", JSON.stringify({ username, password }));
    alert("Qeydiyyat uğurla tamamlandı!");
    window.location.href = "login.html";
  });
}

// ======================
// Giriş
// ======================
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const saved = JSON.parse(localStorage.getItem("userData"));

    if (saved && username === saved.username && password === saved.password) {
      setUser(username);
      window.location.href = "index.html";
    } else {
      alert("İstifadəçi adı və ya şifrə yanlışdır!");
    }
  });
}

// ======================
// Səbət funksiyaları
// ======================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const count = document.getElementById("cart-count");
  if (count) count.textContent = cart.reduce((t, i) => t + i.quantity, 0);
}

// Məhsul əlavə et
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", e => {
    if (!getUser()) {
      alert("Səbətə əlavə etməzdən əvvəl giriş edin!");
      window.location.href = "login.html";
      return;
    }

    const id = Number(btn.dataset.id);
    const name = btn.dataset.name;
    const price = Number(btn.dataset.price);
    const existing = cart.find(i => i.id === id);

    if (existing) existing.quantity++;
    else cart.push({ id, name, price, quantity: 1 });

    saveCart();
    updateCartCount();
    alert(`${name} səbətə əlavə olundu!`);
  });
});

// Səbəti göstər
const cartContainer = document.getElementById("cart-container");
if (cartContainer) {
  function renderCart() {
    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Səbətiniz boşdur 🚗</p>";
      return;
    }

    let html = "";
    let total = 0;
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      html += `
        <div class="cart-item">
          <span>${item.name} - $${item.price} × ${item.quantity}</span>
          <button class="remove" data-id="${item.id}">Sil</button>
        </div>`;
    });
    html += `<h3>Ümumi: $${total.toFixed(2)}</h3>`;
    cartContainer.innerHTML = html;

    document.querySelectorAll(".remove").forEach(btn => {
      btn.addEventListener("click", e => {
        const id = Number(btn.dataset.id);
        cart = cart.filter(i => i.id !== id);
        saveCart();
        renderCart();
      });
    });
  }
  renderCart();
}

updateCartCount();
