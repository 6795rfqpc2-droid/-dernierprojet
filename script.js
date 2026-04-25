const WHATSAPP_NUMBER = "221779223861";
const cartCountEl = document.querySelector("#cart-count");
const buyButtons = document.querySelectorAll(".buy-btn");
const addToCartButtons = document.querySelectorAll(".add-cart-btn");
const revealItems = document.querySelectorAll(".reveal");

const cartState = {
  count: 0
};

function updateCartCounter() {
  cartCountEl.textContent = String(cartState.count);
}

function openWhatsApp(productName) {
  const message = `Bonjour, je souhaite acheter le produit: ${productName}.`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function handleBuyClick(event) {
  const productName = event.currentTarget.dataset.productName || "Produit";
  openWhatsApp(productName);
}

function handleAddToCart() {
  cartState.count += 1;
  updateCartCounter();
}

function initCartFeature() {
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", handleAddToCart);
  });
}

function initBuyButtons() {
  buyButtons.forEach((button) => {
    button.addEventListener("click", handleBuyClick);
  });
}

function initRevealOnScroll() {
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function init() {
  updateCartCounter();
  initBuyButtons();
  initCartFeature();
  initRevealOnScroll();
}

document.addEventListener("DOMContentLoaded", init);
