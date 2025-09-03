# ToDo List - Backend

Backend of the **ToDo List** application built with **Node.js + Express + Supabase**.  
This service provides a RESTful API for managing tasks (add, edit, delete, show all tasks) and handles authentication with Supabase.

## Features
- **Express.js** REST API
- **Supabase** for authentication & database
- **CORS** & **dotenv** configuration
- CRUD operations for tasks
- Ready for **Docker** deployment



## Project Structure
backend/  
│── src/  
│   ├── routes/         # API routes (tasks, auth, etc.)  
│   ├── controllers/    # Request handlers  
│   ├── middlewares/    # Custom middlewares (auth)  
│   ├── core/config/dataBase   # Supabase client setup  
│   └── services/       # Services (tasks, auth, etc.)  
│── server.js           # Server setup
│── drizzle.config.js   # Drizzle configuration
│── package.json  
│── Dockerfile  
│── README.md  


### Install dependencies
run without Docker:
npm install
Run development server:
npm start
The backend API will be available at:
http://localhost:3000

Run with Docker:
Build the Docker image:
docker build -t todo-backend .
Run a container:
docker run -p 5001:5000 todo-backend
Now visit the API at:
 http://localhost:5001

### Tech Stack
Node.js
Express.js
Supabase + Drizzle ORM
CORS
dotenv
Docker



