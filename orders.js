document.addEventListener("DOMContentLoaded", () => {
  const ordersList = document.getElementById('orders-list');
  const raw = localStorage.getItem('orders');
  const orders = raw ? JSON.parse(raw) : [];

  if(!orders || orders.length === 0){
    ordersList.innerHTML = '<div class="empty"><p>Siz hələ heç bir sifariş verməmisiniz.</p></div>';
    return;
  }

  // ters sırada göstərək — sonuncu əvvəl
  orders.slice().reverse().forEach(order => {
    const orderDate = new Date(order.date);
    const formattedDate = orderDate.toLocaleString(); // locale əsaslı oxunaqlı tarix
    const card = document.createElement('article');
    card.className = 'order-card';

    // header
    const meta = document.createElement('div');
    meta.className = 'order-meta';
    meta.innerHTML = `<div class="order-id">Sifariş #${order.id}</div><div class="order-date">${formattedDate}</div>`;

    // items
    const itemsWrap = document.createElement('div');
    itemsWrap.className = 'order-items';
    order.items.forEach(it => {
      const itm = document.createElement('div');
      itm.className = 'order-item';
      // Some items might not have image; fallback to placeholder
      const imgUrl = it.image || 'https://via.placeholder.com/80?text=Image';
      itm.innerHTML = `
        <img src="${imgUrl}" alt="${escapeHtml(it.name)}">
        <div class="item-title">${escapeHtml(it.name)}</div>
        <div class="item-meta">
          <div>$${Number(it.price).toFixed(2)} × ${it.quantity}</div>
          <div>$${(Number(it.price)*Number(it.quantity)).toFixed(2)}</div>
        </div>
      `;
      itemsWrap.appendChild(itm);
    });

    // total
    const totalDiv = document.createElement('div');
    totalDiv.className = 'order-total';
    totalDiv.textContent = `Ümumi: $${Number(order.total).toFixed(2)}`;

    card.appendChild(meta);
    card.appendChild(itemsWrap);
    card.appendChild(totalDiv);
    ordersList.appendChild(card);
  });

  // helper: escape HTML
  function escapeHtml(text) {
    if(!text) return '';
    return text.replace(/[&<>"']/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]; });
  }
});
