
# Collaborative Task Manager

A full-stack **Collaborative Task Management** application inspired by modern tools like Trello and Jira.  
It supports **real-time collaboration**, **task assignment**, **drag-and-drop Kanban boards**, **notifications**, and **dark/light mode**.

---

## 🚀 Live Demo

### Frontend (Vercel)
👉 https://collaborative-task-manager-ll1q.vercel.app

### Backend API (Render)
👉 https://collaborative-task-manager-backend-gve1.onrender.com

> ℹ️ These are the **current production links**.  
> Future GitHub pushes will automatically redeploy to the same URLs.

---

## 🧩 Features

### ✅ Authentication
- User registration & login
- Secure JWT-based authentication (HTTP-only cookies)
- Persistent sessions

### ✅ Task Management (Full CRUD)
- Create, edit, delete tasks
- Assign tasks to registered users
- Set **priority**: Low / Medium / High / Urgent
- Set **status**: To Do / In Progress / Review / Completed
- Due date with **date & time**
- Overdue task detection

### ✅ Kanban Board
- Drag & drop tasks between columns
- Optimistic UI updates
- Real-time sync across users

### ✅ Notifications
- In-app notifications when:
  - A task is assigned to you
  - A task is updated
- Live updates using **Socket.IO**
- Notification panel with timestamps

### ✅ UI / UX
- Clean professional UI
- Dark & Light mode toggle
- Responsive layout
- Polished icons (Lucide React)

---

## 🛠️ Tech Stack

### Frontend
- **React + TypeScript**
- **Vite**
- **Tailwind CSS**
- **React Query (TanStack)**
- **Socket.IO Client**
- **React Hook Form + Zod**
- **Lucide React Icons**

### Backend
- **Node.js + Express**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **JWT Authentication**
- **Socket.IO**

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: PostgreSQL (Render)

---

## 📸 Screenshots

Screenshots are available in the `/screenshots` folder:

- `dashboard-light.png`
- `dashboard-dark.png`

---

## 📂 Project Structure

```
collaborative-task-manager/
├── frontend/        # React frontend
├── backend/         # Express + Prisma backend
├── screenshots/     # UI screenshots
└── README.md
```

---

## ⚙️ Local Development

### 1️⃣ Clone the repository
```bash
git clone https://github.com/dhawalsarode/collaborative-task-manager.git
cd collaborative-task-manager
```

### 2️⃣ Frontend setup
```bash
cd frontend
npm install
npm run dev
```

### 3️⃣ Backend setup
```bash
cd backend
npm install
npm run dev
```

> Make sure to configure `.env` files for backend (DB, JWT, etc.)

---

## 🧪 Status

✅ Core features complete  
✅ Production deployed  

---

## 👨‍💻 Author

**Dhawal Sarode**  
- GitHub: https://github.com/dhawalsarode  
---

## 📄 License

This project is licensed under the **MIT License**.
