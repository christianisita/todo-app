const {initializeDatabase} = require('./configs/database');
const TodoModel = require('./models/todoModel');

function testDatabase(){
    initializeDatabase();

    const todoData = {
        "title": "create a new todo",
        "priority": 1,
        "description": ""
    };

    const newTodo = TodoModel.create(todoData);
    console.log('Created todo:', newTodo);

    const todos = TodoModel.findAll();
    console.log('Todos:', todos);
}

testDatabase();