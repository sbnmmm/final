const container = document.getElementById("checkout-container");

// Cart məlumatlarını localStorage-dan götür
let cart = JSON.parse(localStorage.getItem("cart")) || [];

if(cart.length === 0){
    container.innerHTML = "<p>Səbət boşdur 🛒</p>";
} else {
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const div = document.createElement("div");
        div.classList.add("checkout-item");
        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>Qiymət: ${item.price} AZN</p>
            <p>Miqdar: ${item.quantity}</p>
            <p>Cəmi: ${(item.price*item.quantity).toFixed(2)} AZN</p>
            <hr>
        `;
        container.appendChild(div);
    });

    const summary = document.createElement("div");
    summary.classList.add("checkout-summary");
    summary.innerHTML = `<h2>Ümumi Cəmi: ${totalPrice.toFixed(2)} AZN</h2>`;
    container.appendChild(summary);

    // Sadə forma istifadəçi məlumatları üçün
    const form = document.createElement("form");
    form.innerHTML = `
        <h3>Əlaqə məlumatları</h3>
        <label>Ad Soyad:</label><br>
        <input type="text" id="name" required><br>
        <label>Telefon:</label><br>
        <input type="text" id="phone" required><br><br>
        <button type="submit">Sifarişi təsdiqlə</button>
    `;
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        alert(`Sifarişiniz qeydə alındı!\nAd: ${name}\nTelefon: ${phone}`);
        localStorage.removeItem("cart"); // cart-ı təmizlə
        window.location.href = "index.html"; // əsas səhifəyə qayıt
    });

    container.appendChild(form);
}
