const express = require("express");
const router = express.Router();
//var mongojs = require("mongojs");
//var db = mongojs("mongodb://stefan:stefan281195@ds129156.mlab.com:29156/macrop", ["users"]);
const mongoose = require('mongoose');
const models = require('../schemas and models/data-model.js');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://stefan:stefan281195@ds129156.mlab.com:29156/macrop", {
    useMongoClient: true,
});

router.get("/getAllTasks", (req, res, next) => {
    models.tasks.find((err, project) => {
        if (err)
            res.send(err);
        res.json(project);
    })
})

router.get("/getProjectTasks/:id", (req, res, next) => {
    let projectId = req.params.id;
    models.projects.findById(projectId, (err, project) => {
        if (err)
            res.send(err);
        else {
            var taskArray = new Array();
            project.tasks.forEach(element => {
                taskArray.push(models.tasks.findById(element, (err, task) => {
                    if (err)
                        return;
                    else {
                        return task;
                    }
                }).then());
            });
            Promise.all(taskArray).then(taskArray => {
                res.json(taskArray);
            });
        }
    });
});

router.get("/deleteTask/:id", (req, res, next) => {
    let taskId = req.params.id;
    models.tasks.findByIdAndRemove(taskId, (err, task) => {
        if (err) {
            res.send(err);
            return;
        }
        models.projects.find({ "tasks": taskId }, (erro, project) => {
            if (erro) {
                res.send(erro);
                return;
            }
            let array = new Array();
            array = project.tasks;
            let index = array.findIndex(task => task == taskId);
            array.splice(index, 1);
            project.tasks = array;
            project.save();
        });
    });
});

module.exports = router