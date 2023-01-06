const taxRate = 0.18;
const shippingPrice = 15.0;

window.addEventListener("load", () => {
  //* set item to LocalStorage
  localStorage.setItem("taxRate", taxRate);
  localStorage.setItem("shippingPrice", shippingPrice);

  //* set item to sessionStorage
  // sessionStorage.setItem("taxRate", taxRate);
  // sessionStorage.setItem("shippingPrice", shippingPrice);

  //* add after func. coding
  calculateCartTotal();
});

//* CAPTURING => .product ların ortak parent ı olan .products a addEventListener ile bir event ekleyerek tek event ile .products ın altında bulunan tüm öğelerde aynı event i kullanabilir duruma geldik. Tek addEventListener fonksiyonu kullanarak kaynakları daha az kullanmış oluruz.

//* capturing ⬇️
let productsDiv = document.querySelector(".products");
productsDiv.addEventListener("click", (e) => {
  // console.log(event.target);
  // console.log(e.target);

  //! minus buttons
  // if (e.target.classList.contains("minus")) {
  //* className == "" de class in tamamının yazılması lazım birden fazla class içeriyorsa classList.contains("") sorgulaması daha mantıklı
  if (e.target.className == "minus") {
    // console.log("minusBtn clicked");
    if (e.target.nextElementSibling.innerText > 1) {
      // e.target.parentElement.lastElementChild.innerText;

      e.target.nextElementSibling.innerText--;
      //* calculate Product and Cart Total
      //* passing selectedProductInfo as parameter
      //*parameter => selected product-info div
      calculateProductAndCartTotal(e.target.parentElement.parentElement);
      //       //! closest() ile kisa yoldan secim yapilabilir.
      //       calculateProductAndCartTotal(e.target.closest(".product-info"));
    } else {
      if (confirm("Product will be removed!")) {
        e.target.parentElement.parentElement.parentElement.remove();
        //         //! closest() ile kisa yoldan secim yapilabilir.
        //         e.target.closest(".product").remove();
        //* calculateCartTotal
        calculateCartTotal();
      }
    }
  }

  //* plus buttons
  else if (e.target.className == "plus") {
    // console.log("plusBtn clicked");
    // e.target.parentElement.firstElementChild.innerText;
    e.target.previousElementSibling.innerText++;
    //     //*calculate Product and Cart Total
    calculateProductAndCartTotal(e.target.parentElement.parentElement);
  }

  //   //* remove buttons
  else if (e.target.className == "remove-product") {
    console.log("removeBtn clicked");
    //     if (confirm("Product will be removed")) {
    e.target.parentElement.parentElement.parentElement.remove();
    //! closest() ile kisa yoldan secim yapilabilir.
    // e.target.closest(".product").remove();
    //* calculateCartTotal
    calculateCartTotal();
    //     }
  }
  //*   //other elements
  else {
    // console.log("other elements clicked");
  }
});

//* CALCULATE CARD AND PRODUCT TOTALS

const calculateProductAndCartTotal = (productInfoDiv) => {
  console.log(productInfoDiv);
  let productQuantity =
    productInfoDiv.querySelector("#product-quantity").innerText;
  let productPrice = productInfoDiv.querySelector("strong").innerText;
  let productTotalPriceDiv = productInfoDiv.querySelector(
    ".product-line-price"
  );
  productTotalPriceDiv.innerText = (productQuantity * productPrice).toFixed(2);

  calculateCartTotal();
};

//* CALCULATE CARD TOTALS
const calculateCartTotal = () => {
  let productTotalPriceDivs = document.querySelectorAll(".product-line-price");
  console.log(productTotalPriceDivs);
  let subtotal = 0;
  productTotalPriceDivs.forEach((eachProductTotalPriceDiv) => {
    subtotal += parseFloat(eachProductTotalPriceDiv.innerText);
  });
  console.log(subtotal);
  let taxPrice = subtotal * localStorage.getItem("taxRate");
  console.log(taxPrice);
  let shipping =
    subtotal > 0 ? parseFloat(localStorage.getItem("shippingPrice")) : 0;
  console.log(shipping);
  let cartTotal = subtotal + taxPrice + shipping;
  console.log(cartTotal);
  document.querySelector("#cart-subtotal p:nth-child(2)").innerText =
    subtotal.toFixed(2);
  document.querySelector("#cart-tax p:nth-child(2)").innerText =
    taxPrice.toFixed(2);
  document.querySelector("#cart-shipping p:nth-child(2)").innerText =
    shipping.toFixed(2);
  document.querySelector("#cart-total").lastElementChild.innerText =
    cartTotal.toFixed(2);
};
