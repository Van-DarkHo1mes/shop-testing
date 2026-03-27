# 🏗️ Shop Testing Demo

Демонстрационный проект интернет-магазина стройматериалов для тестирования.

## 📌 Цель проекта
Показать навыки:
- ручного тестирования
- API тестирования (Postman)
- UI автотестирования (Selenium)

## ⚙️ Функционал
- каталог товаров
- поиск
- корзина
- оформление заказа
- валидация телефона
  
## 🛠️ Технологии
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- API тесты: Postman
- UI тесты: Selenium + Python + pytest
  
## 🚀 Запуск проекта
### Backend
  - cd server
  - node server.js
### Frontend
  - cd client
  - python -m http.server 5500
### Открыть:
  - http://127.0.0.1:5500

## 🧪 Тестирование
### API (Postman)
#### Импортировать:
  - postman/ShopDemo.postman_collection.json
#### Проверяются:
  - статус-коды
  - структура ответа
  - ошибки
### UI (Selenium)
  - pytest tests-ui -v
#### Покрытие:
  - поиск товара
  - добавление в корзину
  - изменение количества
  - ошибка при пустом телефоне
  - успешное оформление заказа
