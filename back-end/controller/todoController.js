const Todo = require('../models/todo');

exports.addTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = await Todo.create({ title, description });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const { page, pageSize, status } = req.query;
    console.log(page+pageSize+status)
  let todos = await Todo.findAll();
  console.log(todos)
  // Filtering based on status
  if (status) {
    todos = todos.filter(todo => todo.completed.toString() === status);
  }

  // Pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  const paginatedTodos = todos.slice(startIndex, endIndex);

  // Total number of todos
  const totalTodos = todos.length;

  res.json({ todos: paginatedTodos, totalTodos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    todo.title = title;
    todo.description = description;
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    await todo.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.markCompleted = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    todo.completed = !todo.completed;
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
