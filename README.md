# (QuickHire) Simple Job Board Application

A full-stack **Job Portal** application where admins can create and manage job posts, and users can browse jobs and apply with their details and resume.

This project demonstrates **role-based access**, **dashboard management**, and **modern React + Redux Toolkit Query** architecture.

---

## ✨ Features

### 👤 User

* View all available jobs
* View job details
* Apply to jobs with:

    * Name
    * Email
    * Resume link
    * Cover note

### 🛠 Admin Dashboard

* Create new job posts
* Delete jobs with confirmation popup
* View job listings in a table
* See how many applications each job has received
* Enum-based job categories & location types
* Protected dashboard (Admin only)

---

## 🧱 Tech Stack

### Frontend

* **React + TypeScript**
* **Redux Toolkit Query (RTK Query)**
* **React Router v6**
* **Tailwind CSS**
* **react-hot-toast**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB + Mongoose**
* **Zod (validation)**
* **JWT Authentication**

---



## 🏷 Enums Used

### Job Categories

```ts
Frontend
Backend
Fullstack
DevOps
Mobile
Data Science
Machine Learning
AI Engineer
Cloud Engineer
Cyber Security
QA / Testing
UI / UX
Product Manager
Game Developer
Blockchain
```

### Job Location Types

```ts
Remote
Onsite
Hybrid
```

---

## ⚙️ Environment Variables

### Frontend (`.env`)

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

> Used in RTK Query `baseApi` for API calls.

---

### Backend (`.env`)

```env
PORT=5000
DATABASE_URL=mongodb://localhost:27017/job-portal
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

---

## 🚀 Run Project Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/tareqhasan382/quickhire-backend.git
cd quickhire-backend
```

---

### 2️⃣ Run Backend

```bash
cd quickhire-backend
npm install
npm run dev
```

Backend will run on:

```
http://localhost:5000
```

---

### 3️⃣ Run Frontend

```bash
git clone https://github.com/tareqhasan382/quickhire-frontend.git
cd quickhire-frontend

npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 🔐 Authentication & Authorization

```
admin 
 {
  "email": "admin@example.com",
  "password": "12345678"
}

user 
 {
  "email": "user@example.com",
  "password": "12345678"
}
```
* JWT based authentication
* `ProtectedRoute` ensures:

    * Only authenticated users can access dashboard
    * Admin-only access enforced on backend
* Role-based access (`admin`, `user`)

---

## 📌 API Endpoints (Sample)

### Jobs

```
GET    /api/v1/job
GET    /api/v1/job/:id
POST   /api/v1/job        (admin)
DELETE /api/v1/job/:id    (admin)
```

### Applications

```
POST /api/v1/applications
GET  /api/v1/applications
```

---

## 🧪 Error Handling

* Form validation before submission
* Toast notifications for:

    * Success
    * Failure
* Safe API error handling using `.unwrap()`

---

## 📈 Why This Project Matters

This project demonstrates:

* Scalable frontend architecture
* Clean RTK Query usage
* Real SaaS dashboard patterns
* Production-ready form handling
* Enum-safe data modeling
* Professional UI/UX decisions

---

## 👨‍💻 Author

**Tareq Hasan**

---

