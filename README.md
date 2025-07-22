# **Product Catalog API**  

## **📌 Project Overview**  
The **Product Catalog API** is a RESTful API built with **Node.js, Express, and MongoDB**. It allows users to manage **products** and **categories**, performing CRUD operations efficiently while ensuring secure access through JWT-based authentication.  

---

## **📜 Features**  
✅ **Product Management** – CRUD operations for products  
✅ **Category Management** – Organize products into categories  
✅ **Product Search & Filtering** – Search by name, category, and date created  
✅ **Product Variants** – Support for size, color, and inventory tracking  
✅ **Pricing & Discounts** – Price and discount fields with automatic discounted price calculation  
✅ **Low-Stock Reporting** – Endpoint to query products with low inventory  
✅ **Input Validation & Sanitization** – All create/update endpoints use express-validator  
✅ **Comprehensive Error Handling** – Centralized error handler and validation error responses  
✅ **RESTful API Design** – Follows best API design practices  
✅ **MongoDB Integration** – Uses Mongoose for data handling  
✅ **Swagger Documentation** – API docs available at `/api-docs`  

---

## **🛠️ Tech Stack**  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ORM)  
- **Authentication:** JWT (JSON Web Token), bcrypt.js  
- **API Testing:** Thunder Client / Postman  
- **Development Tools:** Nodemon, dotenv  

---

## **🚀 Installation & Setup**  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/Ms-Lina/ProdCata.git
cd ProdCata
```

### **2️⃣ Install Dependencies**  
```bash
npm install
```

### **3️⃣ Configure Environment Variables**  
Create a `.env` file in the root directory and add:  
```
MONGO_URI=mongodb://localhost:27017/product-catalog
PORT=5000
JWT_SECRET=yourSecretKey
```

### **4️⃣ Start the Server**  
```bash
npm run dev
```
✅ Server runs on **http://localhost:5000**  

---

## **📂 Project Structure**  
```
📦 product-catalog-api
│── node_modules
│── src
│   ├── models            # Mongoose schemas
│   │   ├── Product.js
│   │   ├── Category.js
│   │   ├── User.js
│   ├── routes            # API routes
│   │   ├── productRoutes.js
│   │   ├── categoryRoutes.js
│   ├── controllers       # Business logic for API endpoints
│   │   ├── productController.js
│   │   ├── categoryController.js
│   ├── middlewares       # Middleware functions
│   │   ├── errorHandler.js
│   ├── config            # Database connection setup
│   │   ├── db.js
│   ├── app.js            # Swagger UI Express app (for API docs)
│── .env                  # Environment variables
│── server.js             # Main entry point (starts server, loads routes, connects DB)
│── package.json          # Dependencies & scripts
│── README.md             # Project documentation
```

---

## **🔗 How server.js and app.js Work Together**
- **server.js** is the main entry point of the application. It:
  - Loads environment variables
  - Connects to MongoDB
  - Sets up Express, middleware, and API routes
  - Mounts the Swagger UI (from app.js) at `/api-docs`
  - Starts the HTTP server
- **app.js** (in `src/`) is a minimal Express app that only serves the Swagger UI documentation. It is imported and mounted by `server.js` at the `/api-docs` endpoint.

**Typical startup flow:**
1. You run `npm start` or `npm run dev` (which runs `server.js`).

2. Visit `http://localhost:5000/api-docs` to view the API documentation.

---

## **🔐 Authentication & Authorization**  
The API uses **JWT-based authentication** to secure endpoints:  
- **User Registration & Login**: Users must register and log in to get a token.  
- **Token-Based Access**: The JWT token must be sent in the request header (`Authorization: Bearer <token>`) for protected routes.  
- **Role-Based Access**: Certain actions (like adding products) are restricted to authenticated users.  

 

---

## **📡 API Endpoints**  

### 🟦 Product Endpoints
| Method | Endpoint                | Description                 | Access    | Status Codes | Example |
|--------|-------------------------|-----------------------------|-----------|--------------|---------|
| POST   | `/api/products`         | Create a new product        | Protected | 201, 400     | `{ "name": "Shoe", "price": 100, "discount": 10, "category": "...", "variants": [{"size":"M","color":"Red","stock":5}], "inventory": 10 }` |
| GET    | `/api/products`         | Get all products (with filtering) | Public    | 200          | `/api/products?name=shoe&category=123&createdAfter=2024-01-01` |
| GET    | `/api/products/:id`     | Get a single product        | Public    | 200, 404     |         |
| PUT    | `/api/products/:id`     | Update a product            | Protected | 200, 400, 404|         |
| DELETE | `/api/products/:id`     | Delete a product            | Protected | 200, 404     |         |
| GET    | `/api/products/low-stock` | Get low-stock products     | Public    | 200          | `/api/products/low-stock?threshold=3` |

### 🟩 Category Endpoints
| Method | Endpoint                | Description                 | Access    | Status Codes | Example |
|--------|-------------------------|-----------------------------|-----------|--------------|---------|
| POST   | `/api/categories`       | Create a new category       | Protected | 201, 400     | `{ "name": "Shoes", "description": "Footwear" }` |
| GET    | `/api/categories`       | Get all categories          | Public    | 200          |         |
| GET    | `/api/categories/:id`   | Get a single category       | Public    | 200, 404     |         |
| PUT    | `/api/categories/:id`   | Update a category           | Protected | 200, 400, 404|         |
| DELETE | `/api/categories/:id`   | Delete a category           | Protected | 200, 404     |         |

---

## **📝 Request/Response Examples**

### Create Product (POST /api/products)
**Request Body:**
```json
{
  "name": "Shoe",
  "price": 100,
  "discount": 10,
  "category": "<categoryId>",
  "variants": [{"size":"M","color":"Red","stock":5}],
  "inventory": 10
}
```
**Response:**
```json
{
  "_id": "...",
  "name": "Shoe",
  "price": 100,
  "discount": 10,
  "discountedPrice": 90,
  ...
}
```

### Get Products with Filtering (GET /api/products?name=shoe&category=123)
**Response:**
```json
[
  {
    "_id": "...",
    "name": "Shoe",
    "price": 100,
    "discount": 10,
    "discountedPrice": 90,
    ...
  }
]
```

### Validation Error Example
**Response:**
```json
{
  "errors": [
    { "msg": "Product name is required", "param": "name", ... }
  ]
}
```

---

## **⚠️ Assumptions & Limitations**
- Discounts are percentage-based (e.g., 10 = 10% off).
- Inventory is tracked at the product level and per variant.
- Only basic reporting (low-stock) is implemented.
- Authentication is assumed for protected endpoints (not shown in this sample).

---

## **📜 License**  
This project is licensed under the **MIT License**.  

---

## **📞 Contact**  
For questions or support:  
📧 Email: i.lina@alustudent.com  
🔗 GitHub: [Ms-Lina](https://github.com/Ms-Lina/ProdCata.git)  
