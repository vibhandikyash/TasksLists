var router = require('express').Router();
var config = require('./config');
var stringify = require('json-stringify-safe');
var mongoClient = require('mongodb').MongoClient();
var taskController = require('./Controllers/taskController.js');
var db = require('./db');

var currentdb;

// db.connect(function (db) {
//     currentdb = db;
// });

db.get();

router.get('/', function (req, res, next) {
    res.send('Testing The new Api');
});

router.post('/createtask', function (req, res, next) {

    taskController.createtask(req.body)
        .then(result => res.status(200).send(result))
        .catch((err) => { res.status(500).send(err).end() });

    // console.log('requerst :' + JSON.stringify(req.body));
});

router.get('/getalltasks', function (req, res, next) {
    taskController.getAllTasks()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(500).send(err));
});

router.post('/updatetask', taskController.updateTask)


// , function (req, res, next) {
//     // console.log(req.body);
//     taskController.updateTask(req.body)
//         .then(tasks => res.send(tasks))
//         .catch(err => res.sendStatus(500));
// });

module.exports = router;

