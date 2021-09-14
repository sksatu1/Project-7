const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts()

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="loadProductDetails(${product.id})" id="details-btn" class="btn btn-danger">Details</button>
      <br>
      <br>
      <p class='rating'>average rating : (${product.rating.rate}) <span id='${product.id}'></span></p>
      <p class='rating'>Total rating : ${product.rating.count}</p>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
    showRating(product.id, product.rating.rate);
  }
};

// show star rating
const showRating = (id, stars) => {
  const rating = document.getElementById(id);
  if (stars === 0) {
    rating.innerHTML = `<i class="far<i class="far fa-star"></i> fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`
  }
  if (stars > 0) {
    rating.innerHTML = `<i class="fas fa-star-half-alt"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`
  }
  if (stars > 0.8) {
    rating.innerHTML = `<i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`
  }
  if (stars > 1.3) {
    rating.innerHTML = `<i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`
  }
  if (stars > 1.8) {
    rating.innerHTML = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`
  }
  if (stars > 2.3) {
    rating.innerHTML = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i><i class="far fa-star"></i>`
  }
  if (stars > 2.8) {
    rating.innerHTML = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`
  }
  if (stars > 3.3) {
    rating.innerHTML = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i>`
  }
  if (stars > 3.8) {
    rating.innerHTML = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>`
  }
  if (stars > 4.3) {
    rating.innerHTML = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>`
  }
  if (stars === 5) {
    rating.innerHTML = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>`
  }
}

// load single products details ------------------------------
const loadProductDetails = (productId) => {
  const url = `https://fakestoreapi.com/products/${productId}`
  fetch(url)
    .then(res => res.json())
    .then(data => showProductDetails(data))
}

// displayProductDetails----------------------------------------
const showProductDetails = data => {
  console.log(data);
  const div = document.getElementById("porduct-details");
  div.innerHTML = `<div class="single-product">
  <div>
<img class="product-image" src=${data.image}></img>
  </div>
  <h3>${data.title}</h3>
  <p>description : ${data.description.slice(0, 100)}</p>
  <p>Category: ${data.category}</p>
  <h2>Price: $ ${data.price}</h2>
  </div>
  `;
}



let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
