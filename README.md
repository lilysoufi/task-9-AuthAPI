
#  🔐 Auth Practice API - Minimal Authentication System

  

A minimal Express + MongoDB API to practice authentication concepts: user signup, login, route protection, and field validation.

  
  

##  🛠 Tech Stack

  

Technology => Purpose

Node.js => Runtime

Express.js => Web framework

MongoDB => Database

Mongoose => ODM

JWT Authentication => tokens

argon2 => Password hashing

cookie-parser => Cookie handling

express-rate-limit => Rate limiting

express-validator => Input validation

dotenv => Environment variables


##  🚀 Setup & Installation

###  Prerequisites  

- Node.js (v18 or higher)

- MongoDB (local or Atlas)

###  Installation Steps

bash

###  1. Clone the repository

git clone https://github.com/lilysoufi/task-9-AuthAPI.git

###  2. Install dependencies

npm install

###  3. Create .env file (see below)

like in .env.example (explained below)

###  4. Start MongoDB (if local)

###  5. Run the server

npm run start
  

##  🔐 Environment Variables

  

Create a `.env` file in the root directory:

env

###  Server

PORT=5000

###  Database

MONGODB_URI=mongodb://localhost:27017/auth_practice

###  JWT

JWT_SECRET_KEY= a strong, random string in production

###  Cookie

COOKIE_SECURE=false # Set to true in production (HTTPS)

  

##  📡 API Endpoints

  

Method --- Endpoint ----------------------- Description ------------- Access

  

POST ----- `/api/v1/auth/signup` ----- Register a new user ------ All users

  

POST -----`/api/v1/auth/login` ------ Login user ---------------- All users

  

POST -----`/api/v1/auth/logout` --- Logout user --------------- All users

  

GET ------ `/api/v1/auth/profile` -- Get profile --------------- All users

  

GET ------`api/v1/me/welcome` ------- Welcome user ----------- All users

  

GET ----- `api/v1/me/account-summary`-Account summary --- All users

  

GET ----- `api/v1/admin/overview` - -- Admin

  

GET ----- `api/v1/admin/users-info` - list users without passwords -- Admin

  

DELETE ----- `api/v1/admin/user` --- delete user ---------------- Admin

  
  

##  📮 Example Requests (Postman/Thunder Client)

###  AUTH ROUTE :

###  1. Register :

POST `http://localhost:5000/api/auth/signup`

{

"name" : "hala",

"email" : "hala4@gmail.com", 

"password" : "12344mrL!",

"role" : "user" 

}

###  2. Login

POST `http://localhost:5000/api/auth/login`

{

"email" : "halaadmin@gmail.com",

"password" : "12344mrL!"

}

###  3.Logout

POST `http://localhost:4000/api/v1/auth/logout`
  

###  4.Profile

GET `http://localhost:4000/api/v1/auth/profile`
  

###  PROTECTED ROUTE :

###  1. Welcome

GET `http://localhost:4000/api/v1/me/welcome`

  
###  2.Account summary :

GET `http://localhost:4000/api/v1/me/account-summary`

##  ADMIN ONLY

###  3.Overview :

GET `http://localhost:4000/api/v1/admin/overview`

###  4.User's Info

GET `http://localhost:4000/api/v1/admin/users-info`

###  5.Delete User :

DELETE `http://localhost:4000/api/v1/admin/users/6a2402d484b285fefea3a424

  

##  🔒 Middlewares

  

Middleware Purpose

  

`express.json()` Parses incoming JSON request bodies

  

`cookie-parser()` Parses cookies from incoming requests

  

`rateLimit()` Limits repeated requests to prevent abuse

  

`authenticate` (custom) Verifies JWT token from cookie, attaches user to `req.user`



### Author 
