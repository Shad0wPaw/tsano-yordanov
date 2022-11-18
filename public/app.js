// import productsJSON from './products.json' assert {type: 'json'}; /////  type="module"

// fetch("products.json")
//   .then((response) => {
//     return response.json();
//   })
//   .then((json) => {});

async function productJson() {
  const jsonrespon = await fetch("./products.json");
  const productsJSON = await jsonrespon.json(); //fetch JSON

  let basketJSON = [];
  let productStorage = {};
  let newFilter = [];
  const output = document.getElementById("output-js");
  const outputB = document.getElementById("output-basket");
  const basketIcon = document.getElementById("basket");
  const basketNumber = document.getElementById("basket-number");
  const basketContainer =
    document.getElementsByClassName("basket-container")[0];
  const divElement = document.createElement("div");
  divElement.classList.add("overlay-thumb");
  const buttonClearCart =
    document.getElementsByClassName("basket-footer")[0].childNodes[4];
  const product = document.getElementsByClassName("shop__thumb");
  const addToCart = document.getElementsByClassName("btn-thumb");
  const showAll = document.getElementById("shop-filter-price_0");
  const underTwf = document.getElementById("shop-filter-price_1");
  const twfToFivety = document.getElementById("shop-filter-price_2");
  const fivetyToHundred = document.getElementById("shop-filter-price_3");
  const otherPriceFillter = document.getElementById("shop-filter-price_4");
  const otherPriceInput = document.getElementsByClassName(
    "custom-price-filter"
  )[0];
  const filterIcon = document.getElementById("filter-div");
  const filters = document.getElementsByClassName('div_shop_filter')[0]
  let myBasket;

  if (window.localStorage.getItem("myBasket") == undefined) {
    myBasket = [];
  } else {
    myBasket = window.localStorage.getItem("myBasket");
    basketJSON = JSON.parse(myBasket);
    outputBasket(basketJSON);
  }

  function outputPr(json) {
    output.innerHTML = `
<h4>Products</h4>
${json
  .map(function (vape, index) {
    return `<div class="col-sm-6 col-md-4" key=${index}>
<div class="shop__thumb">
    <div class="shop-thumb__img">
    <img src=${vape.image} width='100%'/>
    </div>
    <h5 class="shop-thumb__title">
      ${vape.title}
    </h5>
    <button class="btn-thumb">Add To Cart</button>
    <div class="shop-thumb__price">
      <span class="shop-thumb-price_old">$20.99</span>
      <span class="shop-thumb-price_new">$${vape.price}</span>
    </div>
</div>
</div>`;
  })
  .join("")}
`;
  }

  function outputBasket(json) {
    outputB.innerHTML = `
${json
  .map(function (vape, index) {
    return `<div class="item-in-basket">
    <div class="left-section-basket">
      <div class="title-section-basket"><h2>${vape.title}</h2></div>
      <div class="price-section-basket"><h2>Price:</h2><h2>$${vape.price}</h2></div>
    </div>
    <img src=${vape.img}/>
  </div>`;
  })
  .join("")}
`;
  }

  //////////////////////////////SHOW BASKET/ SHOW FILTER / ADD TO CART / SHOW BUTTON CART///////////////////////////////////////////////
  function showFilter(){
    filters.style.display != 'block' ?
    filters.style.display = 'block' :
    filters.style.display = 'none' ;
    document.getElementsByClassName('shop__sorting')[0].style.display != 'block' ?
    document.getElementsByClassName('shop__sorting')[0].style.display = 'block' : 
    document.getElementsByClassName('shop__sorting')[0].style.display = 'none'
  }
  function showBasket() {
    basketContainer.style.display != "flex"
      ? (basketContainer.style.display = "flex")
      : (basketContainer.style.display = "none");
  }
  buttonClearCart.addEventListener("click", function () {
    basketJSON = [];
    outputBasket(basketJSON);
    window.localStorage.clear();
  });
  filterIcon.addEventListener('click', showFilter)
  basketIcon.addEventListener("click", showBasket);

  function filterResponsive(){
      if(window.innerWidth > 767){
      filters.style.display = 'block'
      document.getElementsByClassName('shop__sorting')[0].style.display = 'flex'
    } else {
      filters.style.display = 'none'
      document.getElementsByClassName('shop__sorting')[0].style.display = 'none'
    }}

    window.addEventListener('resize', filterResponsive);

  function yourBasket(e) {
    let selectedTitle =
      e.parentNode.firstChild.nextSibling.nextSibling.nextElementSibling
        .innerText;
    let selectedImg =
      e.parentNode.firstChild.nextSibling.nextSibling.children[0].src;
    let selectedPrice = Number(
      e.parentNode.lastChild.previousSibling.firstChild.parentElement.lastChild.previousSibling.innerHTML.slice(
        1
      )
    ).toFixed(2);

    productStorage.title = selectedTitle;
    productStorage.img = selectedImg;
    productStorage.price = selectedPrice;
    basketJSON.push(productStorage);
    outputBasket(basketJSON);
    window.localStorage.clear();
    window.localStorage.setItem("myBasket", JSON.stringify(basketJSON));
    productStorage = {};
    basketNumber.innerText = Number(basketNumber.innerText) + 1;
  }
  //////////////////////////////////////////////////////////////////////////////////
  function hoverAddtoCard() {
    for (let index = 0; index < product.length; index++) {
      addToCart[index].addEventListener("click", () => {
        yourBasket(addToCart[index]);
      });
      product[index].addEventListener("mouseenter", function () {
        product[index].prepend(divElement);
        addToCart[index].style.transform = "translate(-50%, 0px)";
      });
      product[index].addEventListener("mouseleave", function () {
        divElement.remove();
        addToCart[index].style.transform = "translate(-160%, 0px)";
      });
    }
  }
  ///////////////////////////////////////////////FILTER PRICE//////////////////////////////////////////////////////

  function objectFillter(priceFrom, priceTo) {
    return productsJSON.some(function (el) {
      if (priceFrom <= el.price && el.price <= priceTo) {
        newFilter.push(el);
      }
    });
  }

  showAll.addEventListener("change", (event) => {
    if (event.currentTarget.checked) {
      otherPriceInput.style.display = "none";
      outputPr(productsJSON);
      hoverAddtoCard();
    }
  });

  underTwf.addEventListener("change", (event) => {
    if (event.currentTarget.checked) {
      otherPriceInput.style.display = "none";
      objectFillter(0, 25);
      outputPr(newFilter);
      hoverAddtoCard();
      newFilter = [];
    }
  });
  twfToFivety.addEventListener("change", (event) => {
    if (event.currentTarget.checked) {
      otherPriceInput.style.display = "none";
      objectFillter(25, 50);
      outputPr(newFilter);
      hoverAddtoCard();
      newFilter = [];
    }
  });
  fivetyToHundred.addEventListener("change", (event) => {
    if (event.currentTarget.checked) {
      otherPriceInput.style.display = "none";
      objectFillter(50, 100);
      outputPr(newFilter);
      hoverAddtoCard();
      newFilter = [];
    }
  });

  otherPriceFillter.addEventListener("change", () => {
    otherPriceInput.style.display = "block";
  });

  if (showAll.checked) {
    otherPriceInput.style.display = "none";
    outputPr(productsJSON);
    hoverAddtoCard();
  }

  const priceFromFilter = document.getElementById("shop-filter-price_from");
  const priceToFilter = document.getElementById("shop-filter-price_to");
  const buttonPriceFilter = document.getElementById("custom-price_filter");

  buttonPriceFilter.addEventListener("click", (e) => {
    e.preventDefault();
    objectFillter(Number(priceFromFilter.value), Number(priceToFilter.value));
    outputPr(newFilter);
    hoverAddtoCard();
    newFilter = [];
  });
}
productJson();
/////////////////////////////////////////////////////////////////////////////////////////////////////
