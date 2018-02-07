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

router.get("/getChatMessages/:id", (req, res, next) => {
    let projectId = req.params['id'];
    models.chats.findOne({ "projectID": projectId }, (err, chat) => {
        if (err)
            res.send(err);
        else {
            let chatID = chat._id;
            models.messages.find({ 'chatID': chatID.toString() }, (err, messages) => {
                if (err)
                    res.send(err);
                else {
                    res.json(messages);
                    //messages.forEach((message) => console.log(message.text));
                }
            });
        }
    });
});

router.get("/getChat/:id", (req, res, next) => {
    let projectId = req.params['id'];
    models.chats.findOne({ "projectID": projectId }, (err, chat) => {
        if (err)
            res.send(err);
        res.json(chat);
    });
});

// router.get("/getUserChats/:id", (req, res, next) => {
//     let userId = req.param.id;
//     models.chat.find({ "participians": userId }, (err, chats) => {
//         if (err)
//             res.send(err);
//         else
//             res.send(chats);
//     });
// });

//router.post("/getUserChatsWithUser/:object", ())

// router.get("/getChat/:id", (req, res, next) => {
//     let id = req.params['id'];
//     models.chats.find({ "participians": id }, function(err, docs) {
//         res.json(docs);
//     });
// });

module.exports = router;