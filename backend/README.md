# 🔐 RBAC System (Role-Based Access Control)

## 📬 Postman Collection

Import the collection from:


## 📌 Overview

This project implements a **Role-Based Access Control (RBAC)** system with **team-level context**.

It allows:

* Users to belong to multiple teams
* Each user to have a role per team
* Each role to contain multiple permissions
* Access control enforced dynamically via middleware

---

## 🧠 Core Architecture

```text
User
  ↓
Membership (User + Team + Role)
  ↓
Role
  ↓
Permissions
  ↓
RBAC Middleware (checkPermission)
```

---

## 🏗️ Tech Stack

* Node.js
* Express.js
* TypeScript
* MongoDB (Mongoose)
* JWT Authentication
* Winston Logger

---

## 📁 Folder Structure

```text
src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
```

---

## 🧩 Data Models

### 👤 User

* name
* email

### 🏢 Team

* name

### 🔑 Permission

* name (unique)

### 🎭 Role

* name
* permissions[] (ObjectId)

### 🔗 Membership (Core Model)

* user (ObjectId)
* team (ObjectId)
* role (ObjectId)

👉 Constraint:

```text
One user → one role per team
```

---

## 🔐 Authentication

JWT-based authentication.

### Login

```http
POST /api/auth/login
```

```json
{
  "email": "test@mail.com"
}
```

---

## 🧪 API Endpoints

---

### 👤 Users

```http
POST /api/users
GET /api/users
```

---

### 🏢 Teams

```http
POST /api/teams
GET /api/teams
```

---

### 🔑 Permissions

```http
POST /api/permissions
GET /api/permissions
GET /api/permissions/user/:userId/team/:teamId
```

---

### 🎭 Roles

```http
POST /api/roles
GET /api/roles
```

---

### 🔗 Membership

```http
POST /api/membership/assign-role
DELETE /api/membership/remove
```

---

## 🔒 RBAC Middleware

### Usage

```ts
checkPermission("CREATE_TEAM")
```

### Flow

```text
1. Extract userId from JWT
2. Read teamId from headers
3. Fetch user permissions via membership
4. Check if required permission exists
5. Allow or deny request
```

---

## ⚡ Bootstrap Handling

To avoid circular dependency:

```text
No membership exists → RBAC disabled
After first assignment → RBAC enabled
```

---

## 🧪 Complete Flow (Tested)

```text
1. Create User
2. Login → get token
3. Create Permissions
4. Create Role (ADMIN)
5. Create Team
6. Assign Role to User
7. Fetch User Permissions
8. Test Protected Routes
```

---

## 📌 Example Headers

```http
Authorization: Bearer <token>
x-team-id: <teamId>
Content-Type: application/json
```

---

## 🧠 Key Features

* Dynamic permission resolution
* Team-based role assignment
* Scalable RBAC design
* Middleware-based enforcement
* Clean separation (controller/service)
* Production-ready error handling

---

## ⚠️ Common Issues (Handled)

* Invalid ObjectId validation
* Missing token handling
* Duplicate data prevention
* Bootstrap RBAC deadlock
* Token parsing issues

---

## 🚀 How to Run

```bash
npm install
npm run dev
```

---

## 📬 Health Check

```http
GET /health
```

---

## 🎯 Conclusion

This system demonstrates a **real-world RBAC implementation** with:

* Proper data modeling
* Secure authentication
* Dynamic authorization
* Clean architecture

---
## 📬 Postman Collection

Import the collection from:

## 👨‍💻 Author

Chandan
CSE Student | Aspiring Full Stack Engineer
