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
    let teamLeader = req.body.leaderId;
    let members = req.body.members;
    models.teams.create({ name: name, projectID: projectId, leader: leaderId, tasks: [], members: members }, (err, doc) => {
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

router.post("/getTeamByLeaderId", (req, res, next) => {
    let leader = req.body.leaderId;
    let projectId = req.body.projectId;
    models.teams.findOne({ leader: leader, projectID: projectId }, (err, doc) => {
        if (err)
            res.send(err);
        else {
            res.json(doc);
        }
    });
});

router.put("/addUserToTeam", (req, res, next) => {
    let user = req.body.user;
    let teamId = req.body.teamId;
    models.teams.findById(teamId, (err, team) => {
        if (err)
            res.send(err);
        else {
            if (user.role == "teamLeader")
                team.leader = user._id;
            else
                team.members.push(user._id);
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