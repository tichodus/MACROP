const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const models = require('../schemas and models/data-model.js');
var io = require('../sockets/io');

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

router.delete("/deleteTask/:id", (req, res, next) => {
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
            project.forEach(proje => {
                array = proje.tasks;
                let index = array.findIndex(task => task == taskId);
                array.splice(index, 1);
                proje.tasks = array;
                proje.save();
            });
        });
    });
});

router.put("/updateTask", (req, res, next) => {
    console.log(req.body);
    let taskId = req.body._id;
    let name = req.body.name;
    let completness = req.body.completness;
    let responsible = req.body.responsible;
    let body = req.body.body;
    models.tasks.findById(taskId, (erro, task) => {
        if (erro) {
            res.send(erro);
            return;
        }
        task.name = name;
        task.completness = completness;
        task.responsible = responsible;
        task.completness = completness;
        task.body = body;
        task.save();
        io.sockets.emit('taskUpdated', task);
    });
});

router.post("/createTask", (req, res, next) => {
    let name = req.body.name;
    let projectId = req.body.projectID;
    let responsible = req.body.responsible;
    let body = req.body.body;
    let completness = req.body.completness;
    models.tasks.create({ name: name, projectID: projectId, completness: completness, responsible: responsible, body: body },
        (erro, task) => {
            if (erro)
                res.send(erro);
            models.projects.findById(projectId, (err, project) => {
                if (err)
                    res.send(err);
                else {
                    project.tasks.push(task.id);
                    project.save();
                }
            });
            res.json(task);
            io.sockets.emit('taskCreated', task);
        });
});

module.exports = router;