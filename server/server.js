const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ДАННЫЕ
let products = [
  { id: 1, name: 'Цемент', price: 300 },
  { id: 2, name: 'Кирпич', price: 20 },
  { id: 3, name: 'Шпаклёвка', price: 150 },
  { id: 4, name: 'Краска', price: 500 },
  { id: 5, name: 'Плиточный клей', price: 250 },
  { id: 6, name: 'Грунтовка', price: 200 }
];

let cart = [];
let orders = [];

// ENDPOINTS

// Получить товары
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Получить корзину
app.get('/api/cart', (req, res) => {
  res.json(cart);
});

// Добавить товар в корзину
app.post('/api/cart', (req, res) => {
  const { productId } = req.body;

  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Товар не найден' });
  }

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  res.json(cart);
});

// Изменить количество
app.put('/api/cart/:id', (req, res) => {
  const id = Number(req.params.id);
  const { quantity } = req.body;

  const item = cart.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ error: 'Товар не в корзине' });
  }

  if (quantity <= 0) {
    return res.status(400).json({ error: 'Количество должно быть больше 0' });
  }

  item.quantity = quantity;

  res.json(cart);
});

// Удалить товар
app.delete('/api/cart/:id', (req, res) => {
  const id = Number(req.params.id);

  cart = cart.filter(item => item.id !== id);

  res.json(cart);
});

// Оформить заказ
app.post('/api/order', (req, res) => {
  const { name, phone, address } = req.body;

  if (!phone || phone.trim() === '') {
    return res.status(400).json({ error: 'Телефон обязателен' });
  }

  const order = {
    id: Date.now(),
    name,
    phone,
    address,
    items: cart
  };

  orders.push(order);

  cart = [];

  res.json({ message: 'Заказ оформлен', order });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});