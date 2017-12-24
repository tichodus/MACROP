const express = require("express");
const router = express.Router();
var mongojs = require("mongojs");

var db = mongojs("mongodb://stefan:stefan281195@ds129156.mlab.com:29156/macrop");

router.get("/getChat/:id", (req, res, next) => {
    let id = req.params['id'];
    db.chat.find({ "participians": id }, (err, chats) => {
        if (err)
            res.send(err);
        else {
            let chatID = chats[0]._id;
            db.messages.find({ 'chatID': chatID.toString() },(err, messages) => {
                if(err)
                    res.send(err);
                else {
                    messages.forEach((message)=> console.log(message.text));
                   
                    //res.json(messages[0].text);
                }
            })
        }
    });
})

module.exports = router;