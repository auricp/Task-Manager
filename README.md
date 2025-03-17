# Task Manager

## Description
Task Manager is a web application designed to help users organize and manage their tasks efficiently. Built with Node.js and Express, this application provides a user-friendly interface for creating, updating, and tracking tasks.  

Design document for additional information: [Task Manager Design Document](https://docs.google.com/document/d/1iYJ-ulL5iE8eSvgi6psZNv-CfhBusKxIdVumEjUv4rA/edit?usp=sharing)  

Deployment link: [Task Manager](https://task-manager-ukca.onrender.com)

## Features
- User authentication and authorization
- Create, read, update, and delete tasks
- Organize tasks by categories or projects
- Responsive design for desktop and mobile use

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- EJS (Embedded JavaScript) for views
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing

## Prerequisites
- Node.js (v14 or later recommended)
- MongoDB

## Installation

1. Clone the repository:
```
git clone https://github.com/your-username/Task-Manager.git
```
2. Navigate to the project directory:
```
cd Task-Manager
```
3. Install dependencies:
```
npm install
```
5. Set up environment variables:
Create a .env file in the root directory and add the following variables:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
6. Start the application:
```
npm start
```
For development with auto-restart:
```
npm run dev
```
8. Open your browser and visit `http://localhost:${PORT}` Where PORT is the port specified in .env file


## Project Structure
- app.js: Entry point of the application
  
- config/: Configuration files
  - arcjet.js: Arcjet configuration
  - env.js: Environment variables configuration
    
- controllers/: Request handlers for different routes
  - auth.controller.js: handler for auth routes
  - tasks.controller.js: handler for task routes
  - users.controller.js: handler for user routes
    
- middlewares/: Custom middleware functions
  - arcjet.middleware.js: arcjet rate-limiting/bot prevention middleware
  - authentication.middleware.js: Authentication middleware
  - error.middleware.js: Error handling middleware
    
- models/: Database models for MongoDB
  - blacklist.model.js: model for the blacklist collection
  - task.model.js: model for the task collection
  - user.model.js: model for the user collection
    
- public/: Static assets
  - styles.css: Stylesheet for application
    
- routes/: API routes definitions
  - auth.routes.js: authentication route definitions
  - tasks.routes.js: task route definitions
  - users.routes.js: user route definitions
    
- views/: EJS templates
  - partials/: Reusable view components
    - head.ejs: header partial
    - nav.ejs: navigation partial
      
  - auth/: authentication pages
    - signIn: sign in page
    - signUp: sign up page
      
  - tasks/: task pages
    - createTask.ejs: task creation form page
    - editTask.ejs: task editing form page
    - index.ejs: main home page
      
## Scripts
- `npm start`: Start the application using node app.js
- `npm run dev`: Start the application with nodemon for development
- `npm test`: Run tests (currently outputs an error message)
- `npm run lint`: Run ESLint for code quality checks (assumed)
- `npm run build`: Compile the code for production (assumed)
## Configuration
- `main`: The main entry point is set to index.js
- `type`: The project uses ES6 modules
- `license`: ISC (Internet System Consortium License)
- `author`: auricp

## Contribution
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the ISC License.
