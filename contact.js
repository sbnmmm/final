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


