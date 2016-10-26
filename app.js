var path = require('path');
var logger = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var promise = require('bluebird');

var routes = require('./routes');

var app = express();

mongoose.Promise = promise;
mongoose.connect('mongodb://username:password@ds035177.mlab.com:35177/todo-list', (err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 not found and pass to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send(err.message);
});

app.listen(process.env.PORT || 8080, () => {
    console.log('Server started');
});