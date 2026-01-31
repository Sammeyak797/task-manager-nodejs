# Task Manager App

A full-stack task management application built with:

- Node.js
- Express.js
- MongoDB
- React (Vite)

---

## 📦 Project Setup

Clone the repository:

```bash
git clone <your-repo-url>
cd project
```

---

## 🔧 Backend Setup

Go to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside backend folder:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Start backend server:

```bash
node server.js
```

or if using nodemon:

```bash
npm run dev
```

Backend will run on:

```
http://localhost:3000
```

---

## 🎨 Frontend Setup

Open a new terminal.

Go to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 🔗 API Endpoint

```
GET    /api/tasks
POST   /api/tasks
PATCH  /api/tasks/:id
DELETE /api/tasks/:id
```

Base URL:

```
http://localhost:3000/api/tasks
```

---

## 🚀 Run Full Application

1. Start backend server
2. Start frontend server
3. Open browser → http://localhost:5173

---

## 🛠 Tech Stack

- Express.js
- MongoDB + Mongoose
- React + Vite
- CORS
- dotenv

---

## 👨‍💻 Author

Your Name
