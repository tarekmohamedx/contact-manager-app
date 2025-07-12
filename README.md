# Contact Manager App

A full-stack contact management system built with Angular, Node.js, Express, and MongoDB.  
Includes real-time edit locking using WebSockets (Socket.io).
---

## Features

- **Authentication**
- **Add / Edit / Delete Contacts**
- **Contacts Table**
- **Real-time Edit Locking**
- **Security, JWT Auth**
---

## Users

| Username | Password |
|----------|----------|
| `user1`  | `user1`  |
| `user2`  | `user2`  |

---

---

##  Project Structure
contact-manager-app/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── repositories/
│ └── socket/
├── frontend/
│ └── src/app/
│ ├── contact/
│ ├── auth/
│ └── shared/
└── README.md

---

## How to Run Locally

### FrontEnd
```bash or git or temrinal
cd backend
npm install

## .env file
PORT=3000
MONGO_URI=mongodb://localhost:27017/ContactManager
JWT_SECRET=your_jwt_secret


```
### FrontEnd
cd frontend
npm install
ng serve

Then open your browser at:
http://localhost:4200
