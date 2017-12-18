const express = require("express");
const router = express.Router();
var mongojs = require("mongojs");
var db = mongojs("mongodb://stefan:stefan281195@ds129156.mlab.com:29156/macrop", ["users"]);



router.get("/getAllUsers", (req, res, next) => {
    db.users.find((err, docs) => {
        if (err)
            res.send(err);
        res.json(docs);
    });
});


router.post('/login', (req, res, next) => {
    let user = req.body;
    console.log(user);
    if (!user || typeof user === undefined || !user.password) {
        res.status(400);
        res.json({ "error": "Bad Data" });
    }
    else {
        db.users.findOne({
            "username": user.username,
            "password": user.password
        }, (err, user) => {
            if (err)
                res.send(err);
            res.json(user);
        });
    }
});

router.post("/register", (req, res, next) => {
    let user = req.body;
    console.log(user);
    if (!user || typeof user === undefined || !user.email || !user.password) {
        res.status(400);
        res.json({ "error": "Bad Data" });
    }
    else {
        res.json(db.users.insert({
            "email": user.email,
            "username": user.username,
            "password": user.password
        }));
    }
});

module.exports = router;