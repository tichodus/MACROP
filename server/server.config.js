
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
const port = 3000;

var index = require("./routes/index");
var users = require("./routes/users");

var app = express();


/*
*VIEW ENGINE CONFIGURATION
*/

app.set("views", path.join(__dirname, "view"));
app.set('view engine', "ejs");
app.engine('html', require('ejs').renderFile);

/*
*STATIC ANGULAR FOLDER CONFIGURATION
*/

app.use(express.static(path.join(__dirname, "../client")));

/*
*BODY PARSER MIDDLEWARE CONFIGURATION
*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers","Content-Type");
    next();
});

app.use('/', index);
app.use('/api', users);

/*
*STARTING SERVER
*/

app.listen(port, () => {
    console.log("MACROP SERVER STARTED ON PORT " + port);
})