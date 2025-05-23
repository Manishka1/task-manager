# Task Manager

A full-stack task management application with user authentication (JWT), CRUD operations for users and tasks, file uploads, filtering/sorting, and Dockerized development.  

Built with:  
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, Multer  
- **Frontend**: React (Create React App), Redux Toolkit, React Router v5, Material-UI  
- **DevOps**: Docker & Docker Compose  

## Features

- User registration & login (hashed passwords + JWT)  
- Role-based authorization (user vs. admin)  
- CRUD tasks: title, description, status, priority, due date, assignee  
- File attachments (PDF) per task (up to 3 files)  
- List filtering, sorting, and pagination  
- Admin panel to manage users  
- Real-time Dev environment with Docker Compose  

## Prerequisites

- Docker & Docker Compose  
- (Optional) Node.js & npm for local development without Docker  

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Manishka1/task-manager.git
cd task-manager
2. Environment Variables
Copy the sample .env.example into each service folder and fill in credentials:


backend/.env
  PORT=5000
  MONGO_URI=mongodb://mongo:27017/taskmanager
  JWT_SECRET=your_jwt_secret

frontend/.env
  REACT_APP_API_URL=http://backend:5000/api
3. Docker Compose
Bring up the entire stack (MongoDB + backend + frontend) in one command:

BASH

docker-compose up --build
mongo: http://localhost:27017
backend: http://localhost:5000/api
frontend: http://localhost:3000
The frontend CRA dev server runs on port 3000 and proxies API calls to the backend container.

4. Development (without Docker)
If you prefer to run services locally:

Backend
BASH

cd backend
npm install
npm run dev       # or `npm start` for production mode
Frontend
BASH

cd frontend
npm install
npm start
Ensure your backend is running on http://localhost:5000 so the frontend can reach the API at REACT_APP_API_URL.

