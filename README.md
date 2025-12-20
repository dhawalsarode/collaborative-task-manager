# Collaborative Task Manager

A full-stack collaborative task management application with real-time updates, drag-and-drop workflow, authentication, and modern UI.

---

## 🚀 Live Demo

- **Frontend (Vercel):**  
  https://collaborative-task-manager-ll1q.vercel.app/

- **Backend API (Render):**  
  https://collaborative-task-manager-backend-gve1.onrender.com

---

## 🔐 Demo Credentials

Email: demo@taskapp.com  
Password: demo123

---

## ✨ Features

### Authentication
- Secure login using JWT and HTTP-only cookies
- Protected routes with session persistence

### Task Management
- Create tasks with title and description
- Status workflow: TODO → IN PROGRESS → DONE
- Update status via dropdown or drag-and-drop

### Real-Time Collaboration
- Live task updates with Socket.IO
- Instant sync across multiple sessions

### UI / UX
- React + Tailwind CSS
- Card-based Kanban layout
- Responsive design
- Dark / Light mode toggle
- Drag-and-drop interaction

---

## 🛠 Tech Stack

Frontend:
- React (Vite)
- TypeScript
- Tailwind CSS
- React Router
- Axios
- Socket.IO Client
- @hello-pangea/dnd

Backend:
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Socket.IO
- JWT Authentication

Deployment:
- Frontend: Vercel
- Backend: Render
- Database: Render PostgreSQL

---

## 📁 Project Structure

collaborative-task-manager/
├── backend/
│   ├── src/
│   ├── prisma/
└── frontend/
    ├── src/
    └── vite.config.ts

---

## ⚙️ Local Setup (Optional)

Backend:
cd backend  
npm install  
npm run dev  

Frontend:
cd frontend  
npm install  
npm run dev  

---

## ✅ Status

- Authentication: Completed
- Real-time updates: Completed
- Drag & Drop: Completed
- Dark mode: Completed
- Deployment: Completed

---

## 👤 Author

Dhawal Sarode
