
# 🍬 Sweet Shop Management System

A full-stack Sweet Shop Management System built as part of an internship assessment.  
This project demonstrates clean architecture, RESTful API design, JWT authentication,
role-based access control, test-driven development (TDD), and a modern React frontend.

The goal is to reflect real-world engineering practices followed in professional teams.

---

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access control (USER / ADMIN)

### 🍭 Sweet Management (Protected)
- Add new sweets (Admin only)
- View all sweets
- Search sweets by name, category, or price range
- Update sweet details
- Delete sweets (Admin only)

### 📦 Inventory Management
- Purchase sweets (quantity decreases)
- Prevent purchase when stock is zero
- Restock sweets (Admin only)

### 🧪 Testing
- Test-Driven Development (TDD)
- Unit and integration tests
- Coverage of core business logic

### 🎨 Frontend
- Modern responsive UI
- Search and filter sweets
- Disabled purchase button when out of stock
- Role-based UI rendering

---

## 🧱 Tech Stack

### Backend
- Node.js
- TypeScript
- Express
- MongoDB + Mongoose
- JWT Authentication
- Jest & Supertest

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

---

## 📁 Project Structure

sweet-shop/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── models/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   └── tests/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── routes/
│
└── README.md

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm

---

## ⚙️ Backend Setup

cd backend
npm install

Create a .env file:

PORT=8000  
MONGO_URI=mongodb://localhost:27017/sweet-shop  
JWT_SECRET=your_jwt_secret  

Run backend:
npm run dev

Run tests:
npm test

---

## 💻 Frontend Setup

cd frontend
npm install

Create a .env file:

VITE_API_BASE_URL=http://localhost:8000/api

Run frontend:
npm run dev

---

## 🔌 API Endpoints

Auth:
- POST /api/auth/register
- POST /api/auth/login

Sweets:
- POST /api/sweets
- GET /api/sweets
- GET /api/sweets/search
- PUT /api/sweets/:id
- DELETE /api/sweets/:id (Admin)

Inventory:
- POST /api/sweets/:id/purchase
- POST /api/sweets/:id/restock (Admin)

---

## 🧪 Testing Strategy

- Tests written before implementation
- Red → Green → Refactor approach
- Focus on business logic and edge cases

---

## 🤖 My AI Usage

### Tools Used
- ChatGPT
- GitHub Copilot

### How AI Was Used
- Designing API structure and folder organization
- Generating initial test cases
- Debugging and refactoring suggestions
- Documentation drafting

### Reflection
AI was used as a productivity and learning tool.
All generated code was reviewed, modified, and fully understood before use.

---

## 📄 License
MIT License

---

Made with ❤️ by Milan Kalathiya

