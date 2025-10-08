document.addEventListener("DOMContentLoaded", () => {
  const userData = JSON.parse(localStorage.getItem("loggedInUser"));
  const userEmail = document.getElementById("userEmail");
  const miniCartDiv = document.getElementById("miniCart");
  const cart = JSON.parse(localStorage.getItem("cart")) || []; // sebət array

  // Email göstər
  if (userData) {
    userEmail.textContent = userData.email;
  } else {
    userEmail.textContent = "Guest";
  }

  // Mini-cart render
  if(cart.length === 0){
    miniCartDiv.innerHTML = "<p>Sebətiniz boşdur</p>";
  } else {
    let html = "";
    cart.forEach(item => {
      html += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}">
          <span>${item.name} x ${item.quantity}</span>
        </div>
      `;
    });
    miniCartDiv.innerHTML = html;
  }
});
