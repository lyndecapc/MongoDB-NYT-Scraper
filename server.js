//Require Dependencies
var express = require("express");

//setup port & instantiate our express app
var PORT = process.env.PORT || 3000;
var app = express();

//setup express router
var router = express.Router();

//designates our public folder as a static directory
app.use(express.static(_dirname + "/public"));

app.use(router);

//listen on the port
app.listen(PORT, function() {
    console.log("Listening on port:" + PORT);
});