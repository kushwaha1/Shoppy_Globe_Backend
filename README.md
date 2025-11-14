# Shoppy_Globe_Backend
# E-Commerce API

A simple **Node.js** and **Express** backend for an e-commerce platform with **MongoDB** database.  
It supports user authentication, product management, and shopping cart functionality.

## Features

- User registration and login with **JWT authentication**  
- Password hashing using **bcryptjs**  
- get all products and by id  
- Shopping cart with add, update, remove items  
- Stock validation on cart operations
- Logging requests with **morgan**  
- CORS enabled for cross-origin requests  

---

## Tech Stack

- **Node.js**  
- **Express.js**  
- **MongoDB**  
- **Mongoose**  
- **JWT** for authentication  
- **bcryptjs** for password hashing  
- **dotenv** for environment variables  
- **morgan** for logging  
- **cors** for enabling cross-origin requests  
- **ES Modules** (`type="module"`)
- **Postman** for API testing

---

## Project Structure

project-folder/
│
├─ src/
│ ├─ index.js # Entry point
│ ├─ controller/
│ │ └─ auth.controller.js # auth API logic
│ │ └─ cart.controller.js # cart API logic
│ │ └─ product.controller.js # product API logic
│ ├─ routes/
│ │ └─ auth.route.js # auth route definitions
│ │ └─ cart.route.js # cart route definitions
│ │ └─ product.route.js # product route definitions
│ ├─ middleware/
│ │ ├─ auth.js # verify token
│ └─ seed/
│ │ └─ seedProduct.js # add products in db
│ └─ config/
│ │ └─ db.js # mongoDB setup
├─ .env # db credentials
├─ package.json
└─ package-lock.json

### Setup Instructions

```bash
1. Clone the repository 
    (`git clone https://github.com/kushwaha1/Shoppy_Globe_Backend.git`).
2. Run command in vscode terminal `npm i` for installing packages.
3. Open vscode terminal and run `npm run start`.
4. The app will now be running at `http://localhost:5000/`.
5. Also run command `npm run seed` for adding products in db to fetch list. 

```

### Seed Products into Database
To pre-populate product collection in MongoDB for testing:
This command you need to run only once - **npm run seed**
This will insert sample products with fields: name, price, description, stock.

## API Endpoints
- `POST /auth/register` — register
- `POST /auth/login` — login => returns token
- `GET /products` — list products
- `GET /products/:id` — get product
- (Protected) `POST /cart` — add to cart { productId, quantity }
- (Protected) `PUT /cart/:id` — update cart item quantity
- (Protected) `DELETE /cart/:id` — remove cart item
- (Protected) `GET /cart` — get user's cart

## Testing
Use ThunderClient / Postman. Put JWT token in header:
JWT token required for cart routes
`Authorization: Bearer <token>`

## Middleware

**auth.js** – Verifies JWT token and adds user info to req.user
**morgan** – Logs HTTP requests
**cors** – Enables cross-origin requests

---

### Important updates
```bash
1. Added api screenshot document file in `docs` folder - `ShoppyGlobe_API_Document.docx`.
2. Added Postman collection in `docs` folder - `ShoppyGlobe Backend.postman_collection.json`.
    - You can import file in your postman and access the all apis.
3. Added MongoDB json in `docs` folder - `compass-connections.json`.
    - You can import file in your mongodb compass and you can access all saved databases.

```
