const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const models = require('../schemas and models/data-model.js');
var io = require('../sockets/io');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://stefan:stefan281195@ds129156.mlab.com:29156/macrop", {
    useMongoClient: true,
});

router.post("/createReport", (req, res, next) => {
    let name = req.body.name;
    let owner = req.body.owner;
    let type = req.body.type;
    let reports = req.body.reports;
    let data = req.body.data;
    models.reports.create({ name: name, owner: owner, type: type, reports: reports, data: data }, (err, doc) => {
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
    models.reports.findByIdAndRemove(reportId, (err, doc) => {
        if (err)
            res.send(err);
        else
            res.json(doc);
    });
});

module.exports = router;