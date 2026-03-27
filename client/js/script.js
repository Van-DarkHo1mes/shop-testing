const API_URL = 'http://localhost:3000/api';

let allProducts = [];
let filteredProducts = [];

const productsList = document.getElementById('productsList');
const cartList = document.getElementById('cartList');
const totalPrice = document.getElementById('totalPrice');
const searchInput = document.getElementById('searchInput');
const orderForm = document.getElementById('orderForm');
const orderMessage = document.getElementById('orderMessage');

async function fetchProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();

    allProducts = data;
    filteredProducts = data;

    renderProducts(filteredProducts);
  } catch (error) {
    productsList.innerHTML = '<p class="empty-text">Ошибка загрузки товаров</p>';
    console.error('Ошибка при загрузке товаров:', error);
  }
}

async function fetchCart() {
  try {
    const response = await fetch(`${API_URL}/cart`);
    const data = await response.json();
    renderCart(data);
  } catch (error) {
    cartList.innerHTML = '<p class="empty-text">Ошибка загрузки корзины</p>';
    console.error('Ошибка при загрузке корзины:', error);
  }
}

function renderProducts(products) {
  if (!products.length) {
    productsList.innerHTML = '<p class="empty-text">Товары не найдены</p>';
    return;
  }

  productsList.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">
          <h3>${product.name}</h3>
          <div class="product-price">${product.price} ₽</div>
          <button class="secondary-btn" onclick="addToCart(${product.id})">
            Добавить в корзину
          </button>
        </div>
      `
    )
    .join('');
}

function renderCart(cart) {
  if (!cart.length) {
    cartList.innerHTML = '<p class="empty-text">Корзина пуста</p>';
    totalPrice.textContent = '0 ₽';
    return;
  }

  cartList.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-info">
            Цена: ${item.price} ₽ | Количество: ${item.quantity}
          </div>
          <div class="cart-controls">
            <button class="qty-btn" onclick="changeQuantity(${item.id}, ${item.quantity - 1})">-</button>
            <button class="qty-btn" onclick="changeQuantity(${item.id}, ${item.quantity + 1})">+</button>
            <button class="danger-btn" onclick="removeFromCart(${item.id})">Удалить</button>
          </div>
        </div>
      `
    )
    .join('');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPrice.textContent = `${total} ₽`;
}

async function addToCart(productId) {
  try {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || 'Ошибка при добавлении товара');
      return;
    }

    renderCart(data);
  } catch (error) {
    console.error('Ошибка при добавлении в корзину:', error);
    alert('Ошибка сервера');
  }
}

async function changeQuantity(id, quantity) {
  if (quantity <= 0) {
    await removeFromCart(id);
    return;
  }

  try {
    const response = await fetch(`${API_URL}/cart/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || 'Ошибка изменения количества');
      return;
    }

    renderCart(data);
  } catch (error) {
    console.error('Ошибка при изменении количества:', error);
    alert('Ошибка сервера');
  }
}

async function removeFromCart(id) {
  try {
    const response = await fetch(`${API_URL}/cart/${id}`, {
      method: 'DELETE'
    });

    const data = await response.json();
    renderCart(data);
  } catch (error) {
    console.error('Ошибка при удалении товара:', error);
    alert('Ошибка сервера');
  }
}

function filterProducts() {
  const searchValue = searchInput.value.trim().toLowerCase();

  filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchValue)
  );

  renderProducts(filteredProducts);
}

async function submitOrder(event) {
  event.preventDefault();

  orderMessage.textContent = '';
  orderMessage.className = 'order-message';

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();

  try {
    const response = await fetch(`${API_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, phone, address })
    });

    const data = await response.json();

    if (!response.ok) {
      orderMessage.textContent = data.error || 'Ошибка оформления заказа';
      orderMessage.classList.add('error');
      return;
    }

    orderMessage.textContent = data.message || 'Заказ успешно оформлен';
    orderMessage.classList.add('success');

    orderForm.reset();
    fetchCart();
  } catch (error) {
    console.error('Ошибка при оформлении заказа:', error);
    orderMessage.textContent = 'Ошибка сервера';
    orderMessage.classList.add('error');
  }
}

searchInput.addEventListener('input', filterProducts);
orderForm.addEventListener('submit', submitOrder);

fetchProducts();
fetchCart();