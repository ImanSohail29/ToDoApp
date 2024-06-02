Todo List Backend
This project is the backend for a simple Todo List application. It provides RESTful API endpoints to manage todos, including creating, reading, updating, and deleting tasks. The backend is built with Node.js, Express.js, and Postgres.

Getting Started
Follow these instructions to get a copy of the backend running on your local machine.

Prerequisites
Make sure you have the following installed on your machine:

Node.js (version 14 or higher)
npm (version 6 or higher) or Yarn (version 1.22 or higher)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/imanimi29/ToDoApp.git
cd todo-list-backend
Install dependencies:

Using npm:

bash
Copy code
npm install

Set up environment variables:

Create a .env file in the root directory and add the following environment variables:

bash
Copy code
PORT=5050
DATABASE_URL=postgres://todoapp_uco1_user:G2MvlWK1Pl3nh5kbjcYchG9GBkOVnjZX@dpg-cpe6esdds78s73er5ag0-a/todoapp_uco1

Running the Server
To start the server in development mode:

Using npm:

Copy code
npm run dev

Usage
Once the server is running, you can use the following API endpoints to manage todos:

GET /todos: Retrieve a list of all todos.
POST /todos: Create a new todo.
GET /todos/
: Retrieve a single todo by ID.
PUT /todos/
: Update a todo by ID.
DELETE /todos/
: Delete a todo by ID.