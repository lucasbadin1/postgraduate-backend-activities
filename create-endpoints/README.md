# Backend Postgraduate Activities - Product CRUD API

This project is part of my postgraduate activities in Web Development. The objective is to build a simple and functional backend API using **Fastify**, allowing full CRUD operations (Create, Read, Update, Delete) for product data stored localmente em um arquivo `.json`.

## 🛠 Technologies Used

- **Node.js & Fastify**: For creating a fast and minimalist backend server.
- **TypeScript**: For type safety and better code structure.
- **File System (fs)**: For reading and writing product data to a local JSON file.
- **HTML & JavaScript**: For creating a simple front-end interface to interact with the backend via Fetch API.

## 📦 Features

### ✅ API Endpoints

- **GET /products**  
  Returns the list of all products.

- **GET /products/:id**  
  Returns a single product by its `id`.

- **POST /products**  
  Creates a new product with the following fields:  
  `name`, `price`, `description`, `category`, `pictureUrl`.

- **PUT /products/:id**  
  Updates any of the following fields for an existing product:  
  `name`, `price`, `description`, `category`, `pictureUrl`.

- **DELETE /products/:id**  
  Deletes a product by its `id`.

### ✏️ Frontend Interaction

- Simple HTML form to **create** a product.
- HTML form to **update** existing products by `id`, with fields for `name`, `price`, `description`, `category`, and `pictureUrl`.
- Integration with Fetch API to communicate with the backend (POST, PUT, DELETE, GET).

### 🧠 Data Persistence

- Products are stored and updated via a `products.json` file.
- All read/write operations are handled via utility functions using Node.js `fs/promises`.

## 📁 Project Structure

