// login.js
const form = document.getElementById('loginForm');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;


    if(email === "test@mail.com" && password === "12345") {
        localStorage.setItem('loggedInUser', email);
        alert("Uğurla daxil oldunuz!");
        window.location.href = "shop.html"; //səbət hissəsi
    } else {
        alert("Email və ya şifrə yalnışdır!");
    }
});


const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", e => {
  e.preventDefault();

  const email = document.getElementById("login_email").value.trim();
  const password = document.getElementById("login_password").value.trim();

  let users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Email və ya şifrə yanlışdır!");
    return;
  }

  // Login uğurlu olduqda localStorage-da saxla
  localStorage.setItem("loggedInUser", JSON.stringify(user));

  alert(`Xoş gəlmisiniz, ${user.name}!`);
  window.location.href = "index.html"; // əsas səhifəyə yönləndir
});


