# 🛍 Retail Store – Full Stack (React + Node + Prisma + PostgreSQL)

A fully functional retail e-commerce web app with:
✨ User Login & Registration  
✨ Product browsing & cart  
✨ Checkout & Order creation  
✨ Admin panel to manage products & orders  

---

## 🚀 Tech Stack
**Frontend**
- React + Vite
- Context API (Cart)
- Modern UI

**Backend**
- Node.js + Express
- Prisma ORM
- JWT Authentication
- Multer (Image uploads – optional)

**Database**
- SQLLite

---

## 📦 Project Structure

Retail-store/
│
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── middleware/
│ │ ├── db/prisma.js
│ │ ├── server.js
│ │ └── seed.js
│ ├── package.json
│ └── .env
│
└── frontend/
├── src/
│ ├── pages/
│ ├── components/
│ ├── context/
│ └── App.jsx
├── package.json

yaml
Copy code

---

## 🔑 Environment Variables (Backend `.env`)

PORT=4000
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/retaildb"
JWT_SECRET="supersecretkey"

yaml
Copy code

---

## ▶️ How to Run the Project

### Backend
cd backend
npm install
npx prisma migrate deploy
node src/seed.js # Seed initial admin & sample products
npm run dev

nginx
Copy code

Server runs on 👉 `http://localhost:4000`

### Frontend
cd frontend
npm install
npm run dev

yaml
Copy code

Open 👉 `http://localhost:5173`

---

## 👨‍💼 Admin Login
Email: admin@example.com
Password: admin123

yaml
Copy code
(Generated via seed script)

---

## 🌟 Features

| Feature | User | Admin |
|--------|:---:|:---:|
| Login / Signup | ✅ | ❌ |
| View products | ✅ | ✅ |
| Add to cart | ✅ | ❌ |
| Place order | ✅ | ❌ |
| Manage products | ❌ | ✅ |
| Manage orders | ❌ | ✅ |

---

## 🎯 Future Enhancements
- Product image upload from device
- User profile & order history
- Pagination, sorting & filtering
- Payment integration (Razorpay/Stripe)

---

## ✨ Screenshots
(Add later after hosting)

---

## 📝 License
Free to use for learning and improvement.

---

## 👤 Author
**Sukanya**  
🚀 Passionate Full Stack Learner 

