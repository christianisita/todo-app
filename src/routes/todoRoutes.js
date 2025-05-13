const express = require('express');
const TodoController = require('../controllers/todoController');

const router = express.Router();

router.post('/create', TodoController.createTodo);
router.get('/', TodoController.getTodos);
router.get('/:id', TodoController.getTodoById);
router.put('/:id', TodoController.updateTodoById);
router.patch('/:id', TodoController.toggleCompleted);
router.delete('/:id', TodoController.deleteTodo);

module.exports = router;