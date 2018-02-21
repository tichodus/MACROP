const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const models = require('../schemas and models/data-model.js');
var io = require('../sockets/io');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://stefan:stefan281195@ds129156.mlab.com:29156/macrop", {
    useMongoClient: true,
});

router.get("/getReport/:id", (req, res, next) => {
    let reportId = req.params.id;
    models.reports.findById(reportId, (err, report) => {
        if (err)
            res.send(err);
        else
            res.json(report);
    });
});

router.post("/getReportsOfTeam/", (req, res, next) => {
    let reports = new Array();
    let result = new Array();
    reports = req.body.reports;
    reports.forEach(el => {
        models.reports.findById(el, (err, doc) => {
            if (err)
                res.send(err);
            else
                result.push(doc);
        });
    });
    res.json(result);
});

router.post("/getReport", (req, res, next) => {
    let owner = req.body.ownerId;
    let projectId = req.body.projectId;
    //let name = req.body.name;
    console.log(req.body);
    models.reports.findOne({ owner: owner, projectID: projectId }, (err, doc) => {
        if (err)
            res.send(err);
        else {
            res.json(doc);
        }
    });
});

router.post("/createReport", (req, res, next) => {
    let name = req.body.name;
    let owner = req.body.ownerId;
    let type = req.body.type;
    let reports = req.body.reports;
    let data = req.body.data;
    let projectId = req.body.projectId;
    //console.log(req.body);
    models.reports.create({ name: name, owner: owner, type: type, reports: reports, data: data, projectID: projectId }, (err, doc) => {
        if (err)
            res.send(err);
        else {
            models.teams.findOne({ $and: [{ projectID: projectId }, { members: owner }] }, (err, team) => {
                if (err)
                    res.send(err);
                else {
                    console.log(team);
                    models.reports.findOne({
                        $and: [{ owner: team.leader },
                            { projectID: projectId }
                        ]
                    }, (err, report) => {
                        if (err)
                            res.send(err);
                        else {
                            console.log(report);
                            if (report != null) {
                                report.reports.push(doc._id);
                                report.save();
                            } else {
                                models.reports.create({
                                    name: team.name,
                                    owner: team.leader,
                                    type: "teamReport",
                                    reports: [doc._id],
                                    data: "",
                                    projectID: projectId
                                }, (err, teamLeaderReport) => {
                                    if (err)
                                        res.send(err);
                                    else
                                        console.log(teamLeaderReport);
                                });
                            }
                        }
                    });
                }
            });
            res.json(doc);
        }
    });
});

router.put("/updateReport", (req, res, next) => {
    let reportId = req.body.reportId;
    let name = req.body.name;
    let owner = req.body.ownerId;
    let type = req.body.type;
    let reports = req.body.reports;
    let data = req.body.data;
    let projectId = req.body.projectId;


    console.log(req.body);
    models.reports.findById(reportId, (err, doc) => {
        if (err)
            res.send(err);
        else {
            doc.name = name;
            doc.owner = owner;
            doc.type = type;
            doc.reports = reports;
            doc.data = data;
            doc.save();
            res.json(doc);
            io.emit("reportUpdated", doc);
        }
    });
});

router.delete("/deleteReport", (req, res, next) => {
    let reportId = req.body.reportId;
    //let name = req.body.name;
    //let projectId = req.body.projectId;
    models.reports.findByIdAndRemove(reportId, (err, doc) => {
        if (err)
            res.send(err);
        else {
            res.json(doc);
            io.emit("reportDeleted", doc);
        }
    });
});

module.exports = router;