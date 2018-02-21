const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const models = require('../schemas and models/data-model.js');
var io = require('../sockets/io');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://stefan:stefan281195@ds129156.mlab.com:29156/macrop", {
    useMongoClient: true,
});

router.post("/getReport", (req, res, next) => {
    let owner = req.body.owner;
    let projectId = req.body.projectId;
    let name = req.body.name;
    models.reports.findOne({ name: name, owner: owner, projectID: projectId }, (err, doc) => {
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
    models.reports.create({ name: name, owner: owner, type: type, reports: reports, data: data, projectID: projectId }, (err, doc) => {
        if (err)
            res.send(err);
        else
            res.json(doc);
    });
});

router.put("/updateReport", (req, res, next) => {
    let reportId = req.body.reportId;
    let name = req.body.name;
    let owner = req.body.owner;
    let type = req.body.type;
    let reports = req.body.reports;
    let data = req.body.data;
    let projectId = req.body.projectId;
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