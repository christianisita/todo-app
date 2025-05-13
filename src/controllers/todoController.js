const TodoModel = require('../models/todoModel');

class TodoController {
    static createTodo(req, res){
        try {
            const {title, priority, description} = req.body;
            if(!title){
                return res.status(400).json({"error": "title is empty"});
            }
            if(!priority) {
                return res.status(400).json({"error": "priority is empty"});
            }
            const todo = TodoModel.create(req.body);
            res.status(201).json(todo);
        } catch (error) {
            res.status(500).json({"error": error.message});
        }
    }

    static getTodos(req, res){
        try {
            const todos = TodoModel.findAll();
            res.json(todos);
        } catch (error) {
            res.status(500).json({"error": error.message});
        }
    }

    static getTodoById(req, res){
        try {
            const todo = TodoModel.findByID(req.params.id);
            if(!todo){
                return res.status(404).json({"error": "task not found"});
            }
            res.json(todo);
        } catch (error) {
            res.status(500).json({"error": error.message});
        }
    }

    static updateTodoById(req, res){
        try {
            const {id} = req.params;
            const {title, priority, description} = req.body;

            const todo = TodoModel.findByID(id);
            if(!todo){
                return res.status(404).json({"error": "task not found"});
            }

            const updatedTodo = TodoModel.update(id, {title, priority, description});
            res.json(updatedTodo);
        } catch (error) {
            res.status(500).json({"error": error.message});
        }
    }

    static toggleCompleted(req, res){
        try {
            const {id} = req.params;
            const todo = TodoModel.findByID(id);
            if(!todo){
                return res.status(404).json({"error": "task not found"});
            }
            const toggledTodo = TodoModel.toggleStatus(id);
            res.json(toggledTodo);
        } catch (error) {
            res.status(500).json({"error": error.message});
        }
    }

    static deleteTodo(req, res){
        try {
            const {id} = req.params;
            const todo = TodoModel.findByID(id);
            if(!todo){
                return res.status(404).json({"error": "task not found"});
            }

            TodoModel.delete(id);
            res.status(204).json({"message": "Successfully delete task"})
        } catch (error) {
            res.status(500).json({"error": error.message});
        }
    }
}

module.exports = TodoController;