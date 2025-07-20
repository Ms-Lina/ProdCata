# **Product Catalog API**  

## **📌 Project Overview**  
The **Product Catalog API** is a RESTful API built with **Node.js, Express, and MongoDB**. It allows users to manage **products** and **categories**, performing CRUD operations efficiently while ensuring secure access through JWT-based authentication.  

---

## **📜 Features**  
✅ **Product Management** – CRUD operations for products  
✅ **Category Management** – Organize products into categories  
✅ **Authentication & Authorization** – Secure access using JWT  
✅ **Role-Based Access Control** – Restricts actions to authorized users  
✅ **RESTful API Design** – Follows best API design practices  
✅ **MongoDB Integration** – Uses Mongoose for data handling  
✅ **Middleware Support** – Error handling with custom middleware  

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
cd product-catalog-api
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
│   │   ├── authRoutes.js
│   ├── controllers       # Business logic for API endpoints
│   │   ├── productController.js
│   │   ├── categoryController.js
│   │   ├── authController.js
│   ├── middlewares       # Middleware functions
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   ├── config            # Database connection setup
│   │   ├── db.js
│   ├── app.js            # Express app setup
│── .env                  # Environment variables
│── server.js             # Main entry point
│── package.json          # Dependencies & scripts
│── README.md             # Project documentation
```

---

## **🔐 Authentication & Authorization**  
The API uses **JWT-based authentication** to secure endpoints:  
- **User Registration & Login**: Users must register and log in to get a token.  
- **Token-Based Access**: The JWT token must be sent in the request header (`Authorization: Bearer <token>`) for protected routes.  
- **Role-Based Access**: Certain actions (like adding products) are restricted to authenticated users.  

### **🔑 Authentication Endpoints**
| Method | Endpoint           | Description                     | Access     |
|--------|-------------------|---------------------------------|------------|
| POST   | `/api/auth/register` | Register a new user            | Public     |
| POST   | `/api/auth/login`    | User login (returns JWT token) | Public     |

### **🔹 Protected Routes**
- **Only authenticated users** can create, update, or delete **products** and **categories**.  
- **Public routes** (GET requests) are accessible without authentication.  

---

## **📡 API Endpoints**  

### **🔹 Category Endpoints**  
| Method | Endpoint                | Description                 | Access    |
|--------|-------------------------|-----------------------------|-----------|
| POST   | `/api/categories`       | Create a new category       | Protected |
| GET    | `/api/categories`       | Get all categories          | Public    |
| GET    | `/api/categories/:id`   | Get a single category       | Public    |
| PUT    | `/api/categories/:id`   | Update a category           | Protected |
| DELETE | `/api/categories/:id`   | Delete a category           | Protected |

### **🔹 Product Endpoints**  
| Method | Endpoint                | Description                 | Access    |
|--------|-------------------------|-----------------------------|-----------|
| POST   | `/api/products`         | Create a new product        | Protected |
| GET    | `/api/products`         | Get all products            | Public    |
| GET    | `/api/products/:id`     | Get a single product        | Public    |
| PUT    | `/api/products/:id`     | Update a product            | Protected |
| DELETE | `/api/products/:id`     | Delete a product            | Protected |

---

## **📊 Example API Requests**  

### **1️⃣ Register a User (POST)**
**URL:** `http://localhost:5000/api/auth/register`  
**Body (JSON):**  
```json
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "securepassword"
}
```
✅ Response: `201 Created`  

### **2️⃣ Login to Get a Token (POST)**
**URL:** `http://localhost:5000/api/auth/login`  
**Body (JSON):**  
```json
{
  "email": "admin@example.com",
  "password": "securepassword"
}
```
✅ Response:  
```json
{
  "token": "your-generated-jwt-token"
}
```

### **3️⃣ Use the Token in Protected Requests**
```bash
curl -X POST http://localhost:5000/api/products \
-H "Authorization: Bearer YOUR_TOKEN_HERE" \
-H "Content-Type: application/json" \
-d '{"name": "Laptop", "price": 1500, "category": "CATEGORY_ID"}'
```

---

## **🛠️ Challenges & Solutions**  

### **🔸 Issue: MongoDB Connection Error**
**Solution:**  
- Ensure MongoDB is installed and running  
- Verify `MONGO_URI` in `.env` file  

### **🔸 Issue: Token Not Working**
**Solution:**  
- Make sure you're **including the token** in the `Authorization` header  
- Check if the secret key in `.env` matches the one used in `jwt.sign()`  

---

## **📜 License**  
This project is licensed under the **MIT License**.  

---

## **📞 Contact**  
For questions or support:  
📧 Email: i.lina@alustudent.com  
🔗 GitHub: [Ms-Lina](https://github.com/Ms-Lina/ProdCata.git)  
