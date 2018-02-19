var express = require("express");
var router = express.Router();
var methods = require('../methods/request-methods.js');

router.get('/', (req, res, next) => {
    res.render("../view/index.html");
    // let data = {
    //     projectId: "5a89f6e334f3bf00141181ff",
    //     userId: "5a88b67345393a3920859f70"
    // };
    // methods.postMethod("/getRoleForUserOnProject", data);
});

module.exports = router;