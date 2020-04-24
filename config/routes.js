//Bring in the scrape function from scripts folder
var scrape = require("../scripts/scrape");

//Bring in headlines and notes from the controller
var headlinesController = require("../controller/headlines");
var notesController = require("../controllers/notes");


module.exports = function (router) {
    router.get('/', function (req, res) {
        res.render("home");
    });

    router.get("/saved", function (req, res) {
        res.render("saved");
    });

    //This route renders the saved handlebars page
    router.get("/api/fetch", function (req, res) {
        headlinesController.fetch(function (err, docs) {
            if (!docs || docs.insertedContent === 0) {
                res.json({
                    message: "No new articles today. Check back tomorrow!"
                });
            } else {
                res.json({
                    message: "Added " + docs.insertedContent + " new articles!"
                });
            }
        });

    })
}