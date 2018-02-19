const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const models = require('../schemas and models/data-model.js');
var io = require('../sockets/io');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://stefan:stefan281195@ds129156.mlab.com:29156/macrop", {
    useMongoClient: true,
});

router.post("/createRole", (req, res, next) => {
    let projectId = req.body.projectId;
    let userId = req.body.userId;
    let role = req.body.role;
    models.roles.create({ projectID: projectId, userID: userId, role: role }, (err, doc) => {
        if (err)
            res.send(err);
        else
            res.json(doc);
    });
});

router.get("/getRolesForUsersOnProject/:id", (req, res, next) => {
    let projectId = req.params.id;
    models.roles.find({ projectID: projectId }, (err, docs) => {
        if (err)
            res.send(err);
        else
            res.json(docs);
    });
});

router.post("/getRoleForUserOnProject", (req, res, next) => {
    let userId = req.body.userId;
    let projectId = req.body.projectId;
    models.roles.find({ $and: [{ projectID: projectId }, { userID: userId }] }, (err, docs) => {
        if (err)
            res.send(err);
        else
            res.json(docs);
    });
});

router.put("/updateRoleForUser", (req, res, next) => {
    let userID = req.body.userId;
    let projectId = req.body.projectId;
    let newRole = req.body.role;
    models.roles.find({ $and: [{ projectID: projectId }, { userID: userId }] }, (err, role) => {
        if (err)
            res.send(err);
        else {
            role.role = newRole;
            role.save();
            res.json(role);
            io.emit("roleUpdated", role);
        }
    });
});

module.exports = router;