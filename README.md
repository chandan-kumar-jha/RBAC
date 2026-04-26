# 🔐 RBAC (Role-Based Access Control) System

<img width="1907" height="833" alt="image" src="https://github.com/user-attachments/assets/3c8f6bec-e9dd-4391-9935-b318a6f2ecc0" />


A full-stack web application implementing **Role-Based Access Control (RBAC)** where users can register, login, and access resources based on their assigned roles.

🌐 **Live Demo:** https://rbac-0m42.onrender.com

---

## 🚀 Features

* 🔑 User Authentication (Login / Register)
* 🛡️ Role-Based Access Control (Admin / User)
* 🔒 Protected Routes (Frontend + Backend)
* 🌐 REST API Integration
* ⚡ Angular Frontend + Node.js Backend
* 🗄️ Database Integration (Persistent user data)

---

## 🏗️ Tech Stack

### Frontend

* Angular
* TypeScript
* HTML / CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB *(or replace if you're using something else)*

### Deployment

* Render

---

## 📂 Project Structure

```
rbac/
│── frontend/        # Angular App
│── backend/         # Express Server
│── public/          # Production Build (served by backend)
```

---

## ⚙️ How It Works

1. User registers or logs in
2. Backend verifies credentials
3. A role is assigned (Admin/User)
4. Access is granted based on role permissions
5. Protected routes restrict unauthorized users

---

## 🧪 API Endpoints

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| POST   | /api/auth/register | Register user         |
| POST   | /api/auth/login    | Login user            |
| GET    | /api/users         | Get users (Protected) |

---

## 🛠️ Setup & Installation

### 1. Clone the repo

```bash
git clone https://github.com/chandan-kumar-jha/RBAC.git
cd rbac
```

### 2. Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

---

### 3. Run locally

#### Start backend

```bash
cd backend
npm run start
```

#### Start frontend

```bash
cd frontend
ng serve
```

---

### 4. Build for production

```bash
cd frontend
npm run build
```

Copy build files to:

```
backend/public/
```

---

## 🔐 Environment Variables

Create a `.env` file in backend:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## 📸 Screenshots (Optional)

*Add screenshots here*

---

## 👨‍💻 Author

* Chandan
* GitHub: https://github.com/[chandan-kumar-jha](https://github.com/your-username)
* LinkedIn: https://linkedin.com/in/[chandan-kumar-3916b4266](https://linkedin.com/in/your-profile)

---

## ⭐ Future Improvements

* Refresh Tokens
* Role management dashboard
* Better UI/UX
* Logging & monitoring

---

## 📜 License

This project is open-source and available under the MIT License.
