// ----------- Search Redirect Function -------------
function redirectSearch() {
    const searchInput = document.getElementById('nameSearchInput');
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    if (!query) return;

  fetch('json/products.json')
  .then(res => res.json())
  .then(data => {
    const results = data.filter(p => {
      const name = (p.name || "").toLowerCase().trim();
      const desc = (p.description || "").toLowerCase().trim();
      const q = query.toLowerCase().trim();
      return name.includes(q) || desc.includes(q);
    });

    localStorage.setItem('searchResults', JSON.stringify(results));
    window.location.href = 'home.html';
  })
  .catch(err => console.error('Axtarış zamanı xəta:', err));

        



// ----------- Category Redirect Function -------------
function redirectCategory(category) {
    if (!category) return;

    // Seçilmiş kateqoriyanı yadda saxla
    localStorage.setItem('selectedCategory', category.toLowerCase());

    // Home səhifəsinə yönləndir
    window.location.href = 'home.html';
}

// ----------- Sidebar Auto-Close (əgər varsa) -------------
function closeMenu() {
    const sidebar = document.getElementById("mySidebar");
    if (sidebar) {
        sidebar.style.width = "0";
        document.body.style.overflow = "";
    }
}

// ----------- ESC ilə bağlama -------------
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
});
}