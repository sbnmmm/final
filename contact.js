// İndiki ili footer-a qoymaq
document.getElementById('year').textContent = new Date().getFullYear();

// Form göndərmə funksiyası
function submitForm(event) {
  event.preventDefault(); // Formun default göndərilməsini dayandırır

  const btn = document.getElementById('sendBtn');
  const status = document.getElementById('status');

  // Göndərmə zamanı düyməni deaktiv et və mesaj göstər
  btn.disabled = true;
  btn.textContent = 'Göndərilir...';

  // 900ms sonra demo mesaj göstər
  setTimeout(() => {
    status.style.display = 'block';
    btn.disabled = false;
    btn.textContent = 'Göndər';
    event.target.reset(); // Formu sıfırla
  }, 900);

  return false; 
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
  }
}

// Page load zamanı hər səhifədə çağır
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});



