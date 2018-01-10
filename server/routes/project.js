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
    let userId = req.params.id;
    console.log(userId);
    models.projects.find({ $or: [{ "participians": userId }, { "owners": userId }] }, (err, project) => {
        if (err)
            res.send(err);
        res.json(project);
    })
})

router.get("/getProject/:id", (req, res, next) => {
    let projectID = req.params.id;
    console.log(projectID);
    models.projects.findOne({ _id: projectID }, (err, project) => {
        if (err)
            res.send(err);
        res.json(project);
    })
})

router.post("/createProject", (req, res, next) => {
    let ownerId = req.body.ownerId;
    let participians = req.body.participians;
    let projectName = req.body.projectName;
    models.projects.create({ name: projectName, ownerId: ownerID, participians: participians }, (err, proj) => {
        if (err)
            res.send(err);
        else
            res.send(proj);
    })
})

router.put("/addToProject", (request, response) => {
    console.log(request.body);
    let userId = request.body.userId;
    let projectId = request.body.projectId;
    models.projects.findById(projectId, (err, proj) => {
        if (err)
            response.send(err);
        let parti = proj.participians;
        console.log(parti);
        parti.push(userId);
        proj.set({ participians: parti });
        response.send(proj);
        proj.save((err, updatedProject) => {
            if (err)
                response.send(err);
            response.send(updatedProject);
        });
    });
});


module.exports = router;