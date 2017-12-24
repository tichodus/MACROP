const express = require("express");
const router = express.Router();
var mongojs = require("mongojs");

var db = mongojs("mongodb://stefan:stefan281195@ds129156.mlab.com:29156/macrop");

router.get("/getAllTasks", (req, res, next) => {
    db.tasks.find((err, project) => {
        if (err)
            res.send(err);
        res.json(project);
    })
})

router.get("/getProjectTasks/:id", (req, res, next) => {
    let projectId = req.param;
    db.projects.find({ "projectID": projectId }, (err, project) => {
        if (err)
            res.send(err);
        res.json(project);
    })
})

module.exports = router;