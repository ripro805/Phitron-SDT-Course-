const API_BASE_URL = 'https://fakestoreapi.com/products';

const loadAllProduct = () => {
  fetch(API_BASE_URL)
    .then((res) => res.json())
    .then((data) => {
      displayProduct(data);
    })
    .catch((error) => {
      console.error('Error loading products:', error);
    });
};

const displayProduct = (products) => {
  const productContainer = document.getElementById('product-container');

  products.forEach((product) => {
    console.log(product);
    
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img class="card-img" src="${product.image}" alt="${product.title}" />
        <h5>${product.title}</h5>
        <h3>Price: $${product.price}</h3>
        <p>${product.description.slice(0, 50)}...</p>
        <button onclick="singleProduct('${product.id}')">Details</button>
        <button onclick="handleAddToCart('${product.title.slice(0, 12)}', ${product?.price})">Add to Cart</button>
    `;

    productContainer.appendChild(div);
  });
};

const handleAddToCart = (name, price) => {
  const cartCount = document.getElementById('count').innerText;
  let convertedCount = parseInt(cartCount);
  convertedCount = convertedCount + 1;
  document.getElementById('count').innerText = convertedCount;

  console.log('Cart count:', convertedCount);

  const container = document.getElementById('cart-main-container');
  console.log('Adding to cart:', name, price);

  const div = document.createElement('div');
  div.classList.add('cart-info');
  div.innerHTML = `
    <p>${name}</p>
    <h3 class="price">${price}</h3>
  `;
  
  container.appendChild(div);
  
  updateTotal();
};

const updateTotal = () => {
  const allPrice = document.getElementsByClassName('price');
  let count = 0;
  
  for (const element of allPrice) {
    count = count + parseFloat(element.innerText);
  }
  
  document.getElementById('total').innerText = count.toFixed(2);
};

const singleProduct = (id) => {
  console.log('Fetching product ID:', id);
  
  fetch(`${API_BASE_URL}/${id}`)
    .then((res) => res.json())
    .then((product) => {
      console.log('Product details:', product);
    })
    .catch((error) => {
      console.error('Error fetching product details:', error);
    });
};

loadAllProduct();
