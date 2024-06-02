const express = require('express');
const { addTodo, getTodos, updateTodo, deleteTodo, markCompleted } = require('../controller/todoController');

const router = express.Router();

router.post('/todos', addTodo);
router.get('/todos', getTodos);
router.put('/todos/:id', updateTodo);
router.delete('/todos/:id', deleteTodo);
router.patch('/todos/:id/completed', markCompleted);

module.exports = router;
