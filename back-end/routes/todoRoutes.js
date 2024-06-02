const express = require('express');
const { verifyIsLoggedIn } = require("../middlewares/verifyAuthToken");
const { addTodo, getTodos, updateTodo, deleteTodo, markCompleted } = require('../controller/todoController');

const router = express.Router();

// router.use(verifyIsLoggedIn);
router.post('/', addTodo);
router.get('/', getTodos);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);
router.patch('/:id/completed', markCompleted);

module.exports = router;
