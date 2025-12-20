
# Collaborative Task Manager 🚀

A full-stack **real-time collaborative task management application** built with **React, TypeScript, Tailwind CSS, Node.js, Express, Prisma, PostgreSQL, and Socket.IO**.

This project demonstrates **production-level architecture**, **authentication**, **real-time updates**, and a **clean, modern UI**, designed to meet real-world hiring assignment expectations.

---

## ✨ Features

### 🔐 Authentication
- Secure login using **JWT (HTTP-only cookies)**
- Protected routes on frontend & backend
- Persistent sessions

### 📋 Task Management
- Create tasks with title & description
- Task statuses:
  - `TODO`
  - `IN_PROGRESS`
  - `DONE`
- Update task status instantly
- Tasks visible to creator & assignee

### ⚡ Real-Time Collaboration
- Live task updates using **Socket.IO**
- Task creation, status updates, and deletions sync instantly across tabs/users
- No page refresh required

### 🎨 Modern UI
- Built with **Tailwind CSS**
- Kanban-style dashboard
- Responsive layout
- Clean, recruiter-friendly design

---

## 🧱 Tech Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- Axios
- Socket.IO Client
- React Router

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Socket.IO
- JWT Authentication
- Cookie-based auth

---

## 📁 Project Structure

```
collaborative-task-manager/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── auth/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── main.tsx
│   └── tailwind.config.js
│
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   ├── middleware/
│   │   ├── sockets/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   └── prisma/
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```
DATABASE_URL=postgresql://user:password@localhost:5432/taskdb
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

---

## 🚀 Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/collaborative-task-manager.git
cd collaborative-task-manager
```

---

### 2️⃣ Backend Setup
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

Backend runs on:  
👉 `http://localhost:5000`

---

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:  
👉 `http://localhost:5173`

---

## 🔌 Real-Time Sockets

- Socket authentication is tied to JWT cookies
- Each user joins a private room
- Events:
  - `task:created`
  - `task:updated`
  - `task:deleted`

---

## 🧪 Testing
- API tested using Thunder Client / Postman
- Multi-tab browser testing for real-time sync

---

## 🧠 Design Decisions

- **Kanban layout** for clarity and UX
- **Socket.IO rooms** for user-specific updates
- **HTTP-only cookies** for secure auth
- **Separation of concerns** (controllers, services, routes)

---

## 📸 Screenshots

> Dashboard UI with real-time task updates  
> Login page with Tailwind styling  
> Kanban columns (TODO / IN_PROGRESS / DONE)

*(Screenshots can be added here)*

---

## 🏁 Status

✅ Authentication complete  
✅ Real-time collaboration working  
✅ Tailwind UI implemented  
✅ Ready for deployment  

---

## 👤 Author

**Dhawal Sarode**  
Computer Science Graduate  
Full Stack Developer  

---

## 📄 License

MIT License