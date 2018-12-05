var db = require("../models");

module.exports = function (app) {
  // Add a new user
  app.post("/api/users", function (req, res) {
    db.User.create(req.body).then(function (userData) {
      res.json(userData);
    });
  });

  // Add new art
  app.post("/api/art", function (req, res) {
    db.Art.create(req.body).then(function (userData) {
      res.json(userData);
    });
  });

  // Get all art
  app.get("/api/art", function (req, res) {
    db.Art.findAll({}).then(function (artData) {
      res.json(artData);
    });
  });

  // Get a single piece of art
  app.get("/api/art/:id", function (req, res) {
    db.Art.findAll({
      where: {
        id: req.params.id
      }
    }).then(function (artData) {
      res.json(artData);
    });
  });

  // Update art info
  app.put("/api/art/:id", function (req, res) {
    db.Art.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function (artData) {
      res.json(artData);
    });

    // Add new comment
    app.post("/api/comment", function (req, res) {
      db.Comment.create(req.body).then(function (commentData) {
        res.json(commentData);
      });
    });

    // Add an image
    app.post("/api/images", function (req, res) {
      db.Image.create(req.body).then(function (imageData) {
        res.json(imageData);
      });
    });

    // Delete an image
    app.delete("/api/images/:id", function (req, res) {
      db.Image.destroy({
        where: {
          id: req.params.id
        }
      }).then(function (imageData) {
        res.json(imageData);
      });
    })

  };