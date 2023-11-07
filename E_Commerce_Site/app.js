//!SELECTORS

const deleteProducts = document.querySelector(".delete-div .fa-trash-can");
const products = document.querySelector(".products");

//!CONSTANTS
const SHIPPING_PRICE = 25.99;
const FREE_SHIPPING_LIMIT = 3000;
const TAX_RATE = 0.18;

//?Delete Product event

deleteProducts.addEventListener("click", (e) => {
  if (confirm("Silmek İstediğinize emin misiniz?")) {
    products.innerHTML = "No Product!";
    products.classList.add("no-product");
    // document.querySelector(".delete-div").style.display = "none";
    e.target.parentElement.style.display = "none";
    calculateTotalPrice()
  }
});

products.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-plus")) {
    // document.getElementById("quantity").innerText++
    e.target.previousElementSibling.innerText++;
    calculateProductPrice(e.target);
  } else if (e.target.classList.contains("fa-minus")) {
    if (e.target.nextElementSibling.innerText > 1) {
      e.target.nextElementSibling.innerText--;
    }
    calculateProductPrice(e.target);
  } else if (e.target.classList.contains("fa-trash-can")) {
    e.target.closest(".product").remove();
    calculateTotalPrice()
  }
});

const calculateProductPrice = (btn) => {
  const discountedPrice = btn
    .closest(".product-info")
    .querySelector("#discounted-price").textContent;
  const productPrice = btn
    .closest(".buttons-div")
    .querySelector("#product-price");
  const quantity = btn
    .closest(".plus-minus")
    .querySelector("#quantity").textContent;

  productPrice.textContent = (quantity * discountedPrice).toFixed(2);

  calculateTotalPrice();
};

const calculateTotalPrice = () => {
  const prices = document.querySelectorAll("#product-price");

  //*Selected product hesabı
  const subtotal = [...prices].reduce(
    (sum, price) => sum + Number(price.textContent),
    0
  );

  //*shipping Price Hesabı
  const shippingPrice = subtotal >= FREE_SHIPPING_LIMIT || subtotal===0 ? 0 : SHIPPING_PRICE;

  //?Tax Hesabı
  const taxPrice = subtotal * TAX_RATE;

  //?Total Deger
  const totalPrice = subtotal + shippingPrice + taxPrice;
  //?Hesaplanan degerlerin DOM a basılması
  document.getElementById("selected-price").textContent = subtotal.toFixed(2);
  document.getElementById("shipping").textContent = shippingPrice.toFixed(2);
  document.getElementById("tax").textContent = taxPrice.toFixed(2);
  document.getElementById("total").textContent = totalPrice.toFixed(2);
  if(!totalPrice){
    products.innerHTML = "No Product!";
    products.classList.add("no-product");
    document.querySelector(".delete-div").style.display = "none";
  }
};

window.addEventListener("load",()=>{
  calculateTotalPrice()
})
