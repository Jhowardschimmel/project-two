var db = require("../models");

module.exports = function(app) {
  // Load Art Info for index page
  app.get("/", function(req, res) {
    db.Art.findAll({}).then(function(allArt) {
      // console.log(allArt);
      res.render("index", {
        artInfo: allArt
      });
    });
  });

  // Load login page
  app.post("/login", function(req, res) {
    // res.json(allArt);
    res.render("login");
  });
};
