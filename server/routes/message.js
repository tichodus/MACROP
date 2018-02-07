const express = require("express");
const router = express.Router();
//var mongojs = require("mongojs");
//var db = mongojs("mongodb://stefan:stefan281195@ds129156.mlab.com:29156/macrop", ["users"]);
const mongoose = require('mongoose');
const models = require('../schemas and models/data-model.js');

var http = require("http").Server(router);
var io = require('../sockets/io');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://stefan:stefan281195@ds129156.mlab.com:29156/macrop", {
    useMongoClient: true,
});


var app = express();

router.post("/createMessage", (req, res, next) => {
    console.log(req.body);
    let message = req.body;
    models.messages.create(message, (err, messa) => {
        if (err)
            res.send(err);
        res.json(messa);
        io.emit('sentMessage', messa);
    });
});

router.get("/getAllMessages", (req, res, next) => {
    models.messages.find((err, messa) => {
        if (err)
            res.send(err);
        res.json(messa);
    });
});

module.exports = router;