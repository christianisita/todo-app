const TodoModel = require('../models/todoModel');
const { isObjectEmpty } = require('../utils/checker');
const { sendResponse } = require('../utils/responseHelper');

class TodoController {
    static createTodo(req, res) {
        try {
            const { title, priority, description } = req.body;
            if (!title) {
                return sendResponse(res, {
                    success: false,
                    message: 'Title is empty',
                    statusCode: 400
                });
            }
            if (!priority) {
                return sendResponse(res, {
                    success: false,
                    message: 'Priority is empty',
                    statusCode: 400
                });
            }

            const todo = TodoModel.create(req.body);
            sendResponse(res, {
                success: true,
                message: 'Success create todo',
                statusCode: 201,
                data: todo
            });
        } catch (error) {
            sendResponse(res, {
                success: false,
                message: 'Internal Server Error',
                statusCode: 500
            });
        }
    }

    static getTodos(req, res) {
        try {
            const todos = TodoModel.findAll();
            sendResponse(res, {
                success: true,
                message: 'Success get todo',
                statusCode: 200,
                data: todos
            })
        } catch (error) {
            sendResponse(res, {
                success: false,
                message: 'Internal Server Error',
                statusCode: 500
            });
        }
    }

    static getTodoById(req, res) {
        try {
            const todo = TodoModel.findByID(req.params.id);
            const isEmpty = isObjectEmpty(todo);
            if (isEmpty) {
                return sendResponse(res, {
                    success: false,
                    message: "Task not found",
                    statusCode: 404
                });
            }
            sendResponse(res, {
                success: true,
                message: "Success get todo",
                statusCode: 200,
                data: todo
            })
        } catch (error) {
            sendResponse(res, {
                success: false,
                message: 'Internal Server Error',
                statusCode: 500
            });
        }
    }

    static updateTodoById(req, res) {
        try {
            const { id } = req.params;
            const { title, priority, description } = req.body;

            const todo = TodoModel.findByID(id);
            const isEmpty = isObjectEmpty(todo);
            if (isEmpty) {
                return sendResponse(res, {
                    success: false,
                    message: "Task not found",
                    statusCode: 404
                });
            }

            const updatedTodo = TodoModel.update(id, { title, priority, description });
            sendResponse(res, {
                success: true,
                message: "Success update todo",
                statusCode: 200,
                data: updatedTodo
            })
        } catch (error) {
            sendResponse(res, {
                success: false,
                message: 'Internal Server Error',
                statusCode: 500
            });
        }
    }

    static toggleCompleted(req, res) {
        try {
            const { id } = req.params;
            const todo = TodoModel.findByID(id);
            const isEmpty = isObjectEmpty(todo);
            if (isEmpty) {
                return sendResponse(res, {
                    success: false,
                    message: "Task not found",
                    statusCode: 404
                });
            }
            const toggledTodo = TodoModel.toggleStatus(id);
            sendResponse(res, {
                success: true,
                message: "Successfully update todo status",
                statusCode: 200,
                data: toggledTodo
            })
        } catch (error) {
            sendResponse(res, {
                success: false,
                message: 'Internal Server Error',
                statusCode: 500
            });
        }
    }

    static deleteTodo(req, res) {
        try {
            const { id } = req.params;
            const todo = TodoModel.findByID(id);
            const isEmpty = isObjectEmpty(todo);
            if (isEmpty) {
                return sendResponse(res, {
                    success: false,
                    message: "Task not found",
                    statusCode: 404
                });
            }

            TodoModel.delete(id);
            sendResponse(res, {
                success: true,
                message: "Success delete a todo",
                statusCode: 200
            });
        } catch (error) {
            sendResponse(res, {
                success: false,
                message: 'Internal Server Error',
                statusCode: 500
            });
        }
    }
}

module.exports = TodoController;