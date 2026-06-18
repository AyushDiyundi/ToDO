# Todo List Application

A full-stack todo application built with Node.js, Express, MySQL, and JavaScript.

## Features

- Create, read, update, and delete tasks
- Set task descriptions and due dates
- Mark tasks as pending or completed
- Persistent storage in MySQL database
- Single-page application with REST API backend

## Prerequisites

- Node.js (v14 or higher)
- MySQL server running locally
- npm (comes with Node.js)

## Installation

1. Clone or download the project directory

2. Install dependencies:
```
npm install
```

3. Create the MySQL database:
```
mysql -u root -e "CREATE DATABASE todo_app"
```

Note: If your MySQL requires a password, use:
```
mysql -u root -p -e "CREATE DATABASE todo_app"
```

## Running the Application

Start the server:
```
npm start
```

The application will be available at:
```
http://localhost:3000
```

The server will output "Server running on http://localhost:3000" when ready.

## Project Structure

- `app.js` - Express server entry point
- `config/database.js` - MySQL connection configuration
- `models/Task.js` - Task database model using Sequelize
- `routes/api.js` - REST API endpoints
- `public/index.html` - Frontend page
- `public/app.js` - Client-side JavaScript
- `public/style.css` - Styling
- `package.json` - Project dependencies

## How It Works

The application uses a frontend/backend architecture:

1. **Frontend**: Single-page app that loads `index.html` with vanilla JavaScript
2. **Backend**: Express server that serves static files and JSON API
3. **Database**: MySQL stores all tasks with Sequelize ORM

The frontend makes fetch requests to the `/api/tasks` endpoint for all CRUD operations.

## API Endpoints

- `GET /api/tasks` - Retrieve all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task status
- `DELETE /api/tasks/:id` - Delete a task

## Database Schema

The Tasks table contains:
- id (auto-incremented)
- name (task title)
- description (task details)
- dueDate (optional date)
- status (pending or completed)
- createdAt and updatedAt (timestamps)
