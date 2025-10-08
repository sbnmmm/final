const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", e => {
  e.preventDefault();

  const firstName = document.getElementById("first_name").value.trim();
  const lastName = document.getElementById("last_name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const password2 = document.getElementById("password2").value.trim();

  // Bütün sahələri doldurmaq yoxlanışı
  if (!firstName || !lastName || !email || !password || !password2) {
    alert("Zəhmət olmasa bütün sahələri doldurun!");
    return;
  }

  // Şifrələrin uyğunluğunu yoxla
  if (password !== password2) {
    alert("Şifrələr eyni deyil!");
    return;
  }

  // Mövcud istifadəçiləri localStorage-dan al
  let users = JSON.parse(localStorage.getItem('users')) || [];

  // Email artıq mövcuddursa xəbərdarlıq
  if (users.find(u => u.email === email)) {
    alert("Bu email artıq qeydiyyatdan keçib!");
    return;
  }

  // Yeni istifadəçini əlavə et
  users.push({ firstName, lastName, email, password });
  localStorage.setItem('users', JSON.stringify(users));

  alert("Uğurla qeydiyyatdan keçdiniz! İndi login olun.");
  window.location.href = "login.html";
});

