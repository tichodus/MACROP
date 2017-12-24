const express = require("express");
const router = express.Router();
var mongojs = require("mongojs");

var db = mongojs("mongodb://stefan:stefan281195@ds129156.mlab.com:29156/macrop");

router.get("/getAllProjects", (req, res, next) => {
    db.projects.find((err, project) => {
        if (err)
            res.send(err);
        res.json(project);
    })
})

router.get("/getProjects/:id", (req, res, next) => {
    let userId = req.param;
    db.projects.find({ $or: [{ "participians": userId }, { "owner": userId }] }, (err, project) => {
        if (err)
            res.send(err);
        res.json(project);
    })
})

module.exports = router;