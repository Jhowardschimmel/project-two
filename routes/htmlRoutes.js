var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Art.findAll({}).then(function(allArt) {
      // res.json(allArt);
      res.render("index", {
        artInfo: allArt
      });
    });
  });

  // Load login page
  app.post("/login", function(req, res) {
    // res.json(allArt);
    res.render("index");
  });
};
