//Require Dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

//setup port & instantiate our express app
var PORT = process.env.PORT || 3000;
var app = express();

//setup express router
var router = express.Router();

require("./config/routes")(router);

//designates our public folder as a static directory
//app.use(express.static(_dirname + "/public"));

//connect handlebars to our Express app
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(router);

//if deployed, use the deployed database, otherwise use the local mongoHeadlines db
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//connect mongoose to our database
mongoose.connect(db, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("mongoose connection is successful");
    }
});

//listen on the port
app.listen(PORT, function () {
    console.log("Listening on port:" + PORT);
});