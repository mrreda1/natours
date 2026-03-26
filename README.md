# Natours

Natours is a backend API for managing tours, tour guides, and users.
It allows users to explore tours, view locations, schedules, and interact with tour data.
This project was built to practice Node.js, MongoDB, and Mongoose while implementing real-world backend features.

## Features

* Tours management (CRUD operations)
* User authentication (JWT)
* Authorization & role-based access control
* Protected routes
* Tour guides information
* Tour locations and scheduling
* RESTful API design
* MongoDB database with Mongoose models
* Email functionality
* Error handling & middleware
* Postman collection for testing endpoints

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Postman (API testing)

## Installation

```bash
git clone https://github.com/your-username/natours.git
cd natours
npm install
```

## Environment Variables

Create a `config.env` file in the root directory:

```
NODE_ENV=development
PORT=3000
DATABASE_LOCAL=mongodb://127.0.0.1:27017/natours

JWT_SECRET=your_jwt_secret
JWT_LIFETIME=90d
JWT_COOKIE_EXPIRES_IN=90

PROJECT_DIR=your_project_directory_path
EMAIL=your_email_address
EMAIL_TOKEN=your_email_service_token
```

## Run the Project

```
npm start
```

## Authentication & Authorization

* JWT-based authentication
* Protected routes middleware
* Role-based authorization (admin, user, etc.)
* Secure cookies for authentication

## API Testing

A Postman collection is included in the repository to test all endpoints.
Import the collection into Postman and start testing the API.

## Project Structure

```
natours/
│
├── controllers/
├── models/
├── routes/
├── utils/
├── public/
├── config.env
├── app.js
├── server.js
└── package.json
```

## Learning Objectives

This project helped me practice:

* Backend architecture design
* RESTful API development
* MongoDB schema design
* Mongoose advanced features
* Authentication & authorization
* Middleware pattern
* Error handling in Node.js

## .gitignore

Make sure to ignore sensitive files:

```
config.env
node_modules/
```

## Author

Mohamed Reda

---

Feel free to fork the project or suggest improvements. ⭐
