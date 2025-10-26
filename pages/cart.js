function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  // 🛍️ If cart is empty
  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty 🛍️</p>";
    totalEl.textContent = "";
    return;
  }

  let total = 0;

  // 🧩 Render all cart items
  container.innerHTML = cart.map((item, i) => {
    const priceNum = parseInt(item.price.replace(/[₹,]/g, "")) || 0;
    total += priceNum;

    // ✅ Fix image path automatically
    let imgPath = item.img;
    // If image path doesn’t already start from root or parent directory, fix it
    if (!imgPath.startsWith("..") && !imgPath.startsWith("/")) {
      imgPath = "../" + imgPath;
    }

    return `
      <div class="cart-item">
        <img src="${imgPath}" alt="${item.name}" />
        <div>
          <p><b>${item.name}</b></p>
          <p>${item.price}</p>
        </div>
        <button class="remove-btn" onclick="removeItem(${i})">Remove</button>
      </div>
    `;
  }).join('');

  // 💰 Show total
  totalEl.textContent = `Total: ₹${total.toLocaleString()}`;
}

// 🗑️ Remove one item
function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// 🧹 Clear entire cart
document.getElementById("clear-cart").addEventListener("click", () => {
  localStorage.removeItem("cart");
  loadCart();
});

// 🚀 Load cart when page opens
document.addEventListener("DOMContentLoaded", loadCart);
