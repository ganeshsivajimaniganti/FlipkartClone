/* ---------------- BANNER SLIDER ---------------- */
let currentSlide = 0;
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".banner-img");
  if (slides.length === 0) return;

  setInterval(() => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }, 4000);
});

/* ---------------- PRODUCT LOADING ---------------- */
let products = [];

async function loadProducts() {
  try {
    const res = await fetch("./products.json");
    products = await res.json();
    renderAllCategories(); // Default home view shows all categories
  } catch (err) {
    console.error("Error loading products:", err);
  }
}

/* ---------------- RENDER ALL CATEGORIES ---------------- */
// When Home is clicked — show each category with its products grouped below.
function renderAllCategories() {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  // Get unique category names
  const categories = [...new Set(products.map(p => p.category))];

  // Create section for each category
  categories.forEach(cat => {
    const section = document.createElement("div");
    section.classList.add("category-section");

    const title = document.createElement("h2");
    title.classList.add("category-title");
    title.textContent = cat;

    const productContainer = document.createElement("div");
    productContainer.classList.add("product-container");

    const filtered = products.filter(p => p.category === cat);
    productContainer.innerHTML = filtered.map(product => `
      <div class="product-card">
        <img src="${product.img}" alt="${product.name}">
        <div class="product-name">${product.name}</div>
        <div class="product-price">${product.price}</div>
        <button class="add-to-cart" onclick="addToCart('${product.name}', '${product.price}', '${product.img}')">Add to Cart</button>
      </div>
    `).join('');

    section.appendChild(title);
    section.appendChild(productContainer);
    container.appendChild(section);
  });
}

/* ---------------- RENDER SINGLE CATEGORY ---------------- */
function renderCategory(category) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  const section = document.createElement("div");
  section.classList.add("category-section");

  const title = document.createElement("h2");
  title.classList.add("category-title");
  title.textContent = category;

  const productContainer = document.createElement("div");
  productContainer.classList.add("product-container");

  const filtered = products.filter(p => p.category === category);
  productContainer.innerHTML = filtered.map(product => `
    <div class="product-card">
      <img src="${product.img}" alt="${product.name}">
      <div class="product-name">${product.name}</div>
      <div class="product-price">${product.price}</div>
      <button class="add-to-cart" onclick="addToCart('${product.name}', '${product.price}', '${product.img}')">Add to Cart</button>
    </div>
  `).join('');

  section.appendChild(title);
  section.appendChild(productContainer);
  container.appendChild(section);
}

/* ---------------- CATEGORY BUTTON CLICK ---------------- */
document.querySelectorAll(".category-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    document.querySelectorAll(".category-link").forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    const cat = link.getAttribute("data-category");
    if (cat === "All") {
      renderAllCategories();
    } else {
      renderCategory(cat);
    }
  });
});

/* ---------------- ADD TO CART ---------------- */
function addToCart(name, price, img) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price, img });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

document.addEventListener("DOMContentLoaded", loadProducts);
