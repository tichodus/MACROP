const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const models = require('../schemas and models/data-model.js');
var io = require('../sockets/io');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://stefan:stefan281195@ds129156.mlab.com:29156/macrop", {
    useMongoClient: true,
});

router.post("/createTeam", (req, res, next) => {
    let name = req.body.name;
    let projectId = req.body.projectId;
    models.teams.create({ name: name, projectID: projectId, leader: [], tasks: [], members: [] }, (err, doc) => {
        if (err)
            res.send(err);
        else
            res.json(doc);
    });
});

router.get("/getProjectTeams/:id", (req, res, next) => {
    let projectId = req.params.id;
    models.teams.find({ projectID: projectId }, (err, docs) => {
        if (err)
            res.send(err);
        else
            res.json(docs);
    });
});

router.put("/addUserToTeam", (req, res, next) => {
    let userId = req.body.userId;
    let teamId = req.body.teamId;
    let leader = req.body.leader;
    models.teams.findById(teamId, (err, team) => {
        if (err)
            res.send(err);
        else {
            if (leader == "true")
                team.leader = userId;
            else
                team.members.push(userId);
            team.save();
            res.json(team);
            io.emit("userAddedToTeam", team);
        }
    });
});

router.delete("/deleteTeamFromProject", (req, res, next) => {
    let teamId = req.body.teamId;
    let projectId = req.body.projectId;
    models.teams.findById(teamId, (err, team) => {
        if (err)
            res.send(err);
        else {
            models.projects.findOne(projectId, (err, project) => {
                if (err)
                    res.send(err);
                else {
                    project.teams = project.teams.filter(element => element != teamId);
                    project.save();
                }
            });
            team.remove();
            io.emit("teamRemoved", team);
        }
    });
});

module.exports = router;