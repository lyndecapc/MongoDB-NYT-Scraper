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
    });
    router.get("/api/headlines", function (req, res) {
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }

        headlinesController.get(query, function (data) {
            res.json(data);
        });
    });
    router.delete("/api/headlines/:id", function (req, res) {
        var query = {};
        query._id = req.params.id;
        headlinesController.delete(query, function (err, data) {
            res.json(data);
        });
    });
    router.patch("/api/headlines", function (req, res) {
        headlinesController.update(req.body, function (err, data) {
            res.json(data);
        });
    });
    router.get("/api.notes/:headline_id?", function (req, res) {
        var query = {};
        if (req.params.headline_id) {
            query._id = req.params.headline_id;
        }
        notesController.get(query, function (err, data) {
            res.json(data);
        });
    });
    router.delete("/api/notes/:id", function (req, res) {
        var query = {};
        query._id = req.params.id;
        notesController.delete(query, function (err, data) {
            res.json(data);
        });
    });
    router.post("/api/notes", function (req, res) {
        notesController.save(req.body, function (data) {
            res.json(data);
        });
    });
}
