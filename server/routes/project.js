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

router.get("/getAllProjects", (req, res, next) => {
    models.projects.find((err, project) => {
        if (err)
            res.send(err);
        res.json(project);
    })
})

router.get("/getProjects/:id", (req, res, next) => {
    let userId = req.param;
    models.projects.find({ $or: [{ "participians": userId }, { "owner": userId }] }, (err, project) => {
        if (err)
            res.send(err);
        res.json(project);
    })
})

module.exports = router;