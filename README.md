# Task Manager

A full-stack task management application featuring user authentication with JWT, comprehensive CRUD operations for users and tasks, file uploads, filtering, sorting, and a Dockerized development environment.

---

## Built With

- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Multer  
- **Frontend:** React (Create React App), Redux Toolkit, React Router v5, Material-UI  
- **DevOps:** Docker & Docker Compose  

---

## Features

- User registration & login with hashed passwords and JWT authentication  
- Role-based authorization (user vs. admin)  
- CRUD operations for tasks: title, description, status, priority, due date, assignee  
- File attachments per task (PDFs only, up to 3 files)  
- List filtering, sorting, and pagination  
- Admin panel for user management  
- Real-time development environment using Docker Compose  

---

## Prerequisites

- [Docker](https://www.docker.com/get-started) & [Docker Compose](https://docs.docker.com/compose/install/)  
- (Optional) Node.js & npm for local development without Docker  

---

## Getting Started

Follow these steps to set up the project on your local machine.

### 1. Clone the Repository

``bash
git clone https://github.com/Manishka1/task-manager.git
cd task-manager

##2. Configure Environment Variables
Copy the sample .env.example files into each service folder and fill in the required credentials.

backend/.env
PORT=5000
MONGO_URI=mongodb://mongo:27017/taskmanager
JWT_SECRET=your_jwt_secret

frontend/.env
REACT_APP_API_URL=http://backend:5000/api

## 3. Run with Docker Compose
Start the entire stack (MongoDB, backend, frontend) using:

BASH

docker-compose up --build
MongoDB: http://localhost:27017
Backend API: http://localhost:5000/api
Frontend: http://localhost:3000
The frontend Create React App development server runs on port 3000 and proxies API calls to the backend container.

## 4. Development Without Docker (Optional)
If you prefer to run the services locally:

Backend
BASH

cd backend
npm install
npm run dev       # Use `npm start` for production mode


Frontend
BASH

cd frontend
npm install
npm start
Ensure the backend is running on http://localhost:5000 so the frontend can reach the API as per REACT_APP_API_URL.

##  Additional Notes
MongoDB database name: miniTeam
File uploads restricted to PDFs, max 3 files per task
