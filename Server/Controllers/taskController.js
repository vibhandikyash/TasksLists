var db = require('../db');
var config = require('../config');

var taskController = {

    createtask: function (Task) {
        return db.insertOne('tasks', Task);
        // .then(result => cb(result.insertedCount))
        // .catch(e => cb(e));
        // mydb.collection('tasks').
        //     insertOne(Task, function (err, res) {
        //         if (!err) {
        //             return cb(true);
        //         } else {
        //             return cb(err);
        //         }
        //     });
    },

    getAllTasks: function () {
        return db.getall('tasks');
    },

    updateTask: function (req, res, next) {
        db.updateDocument('tasks', req.body, req.body._id)
            .then(taskController.getAllTasks)
            .then(tasks => res.send(tasks))
            .catch(err => res.writeHead(500).send(err));
    }
}

module.exports = taskController;