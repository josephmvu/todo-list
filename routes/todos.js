var Todo = require('../models/todo');

function getAllTodos(req, res, next) {
    Todo.find({}).sort({ _id : -1 })
    .then((todos) => {
        res.status(200).json(todos);
    })
    .catch((err) => {
        next(err);
    });
}

function createTodo(req, res, next) {
    Todo.create(req.body)
    .then((todo) => {
        res.status(200).json(todo);
    })
    .catch((err) => {
        next(err);
    });
}

function updateTodo(req, res, next) {
    Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((todo) => {
        res.status(200).json(todo);
    })
    .catch((err) => {
        next(err);
    });
}

function deleteTodo(req, res, next) {
    Todo.findByIdAndRemove(req.params.id)
    .then((todo) => {
        res.status(200).json(todo);
    })
    .catch((err) => {
        next(err);
    });
}

module.exports = {
    getAllTodos: getAllTodos,
    createTodo: createTodo,
    updateTodo: updateTodo,
    deleteTodo: deleteTodo
};