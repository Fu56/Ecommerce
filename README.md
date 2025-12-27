# 🛍️ All-Mart - Modern MERN Ecommerce Platform

A fully functional, responsive, and modern Ecommerce application built with the MERN stack (MongoDB, Express, React, Node.js). This project features a robust admin dashboard, secure authentication, product management, and payment integration.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)

## 🚀 Tech Stack

### Frontend

- **React.js (Vite)**: Fast and modern UI library.
- **Ant Design (AntD)**: Premium component library for elegant UI elements.
- **Bootstrap 5**: Responsive layout system.
- **Context API**: State management for Auth, Cart, and Search.
- **Axios**: HTTP client for API requests.
- **React Router DOM**: Client-side routing.

### Backend

- **Node.js**: Runtime environment.
- **Express.js**: Web framework for building the REST API.
- **MongoDB & Mongoose**: NoSQL database and object modeling.
- **JWT (JSON Web Tokens)**: Secure user authentication.
- **Bcrypt**: Password hashing.
- **Chapa**: Payment gateway integration.

---

## 🛠️ Features

- **User Authentication**: Register, Login, Forgot Password, Profile Update.
- **Product Management**: Create, Read, Update, Delete (CRUD) products and categories (Admin).
- **Shopping Cart**: Add to cart, variable quantities, remove items.
- **Checkout & Payment**: Integrated payment gateway (Chapa) and order processing.
- **Search & Filter**: Filter products by category, price range, and search by keyword.
- **Admin Dashboard**: Manage users, products, categories, and view all orders.
- **User Dashboard**: View order history, manage profile.
- **Responsive Design**: Mobile-friendly interface.

---

## ⚙️ Installation & Setup

Follow these steps to get a local copy running on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Git](https://git-scm.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) Account (Cloud Database)

### 1. Clone the Repository

```bash
git clone <your-github-repo-url>
cd Ecommerce
```

### 2. Install Dependencies

You need to install dependencies for both the root (concurrently), backend, and frontend.

```bash
# Install root dependencies
npm install

# Install Backend dependencies
cd backend
npm install
cd ..

# Install Frontend dependencies
cd frontend/client
npm install
cd ../..
```

### 3. Environment Variables config

Create a `.env` file in the **`backend`** directory and add the following:

```env
PORT=8080
DEV_MODE=development
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_key
# Private keys for payment gateways if applicable
```

### 4. Run the Application

You can run both the backend and frontend concurrently from the root directory.

```bash
# From the root directory 'Ecommerce'
npm run dev
```

- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:8080`

---

## 📂 Project Structure

```bash
Ecommerce/
├── backend/                # Backend API logic
│   ├── config/             # DB Connection
│   ├── controllers/        # Request handlers
│   ├── models/             # Mongoose Schemas
│   ├── routes/             # API Routes
│   └── server.js           # Entry point
├── frontend/client/        # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Global State (Auth, Cart, etc.)
│   │   ├── pages/          # Full page views
│   │   └── styles/         # Custom CSS
└── package.json            # Root scripts
```

---

## 💡 Tips for Developers

1.  **Database Connection**: Ensure your IP address is whitelisted in MongoDB Atlas (Network Access > Allow Access from Anywhere `0.0.0.0/0`) if you encounter connection errors.
2.  **Vercel Deployment**:
    - Deploy Backend and Frontend as separate projects.
    - Backend Root Directory: `backend`
    - Frontend Root Directory: `frontend/client`
    - Add `VITE_API` env var in Frontend pointing to the deployed Backend URL.
    - Add `MONGO_URI` env var in Backend pointing to Atlas.

## 🤝 Contributing

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 👤 Author

**Fuad Abdela**

---

_Happy Coding!_ 🚀
