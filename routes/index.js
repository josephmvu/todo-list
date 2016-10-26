var express = require('express');
var router = express.Router();
var queries = require('./todos');

router.get('/', function(req, res) {
    res.sendFile('index.html');
});

router.get('/api/todos', queries.getAllTodos);
router.post('/api/todos', queries.createTodo);
router.put('/api/todos/:id', queries.updateTodo);
router.delete('/api/todos/:id', queries.deleteTodo);

module.exports = router;