require("dotenv").config({ path: __dirname + ".env.test" });
var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/art", function() {
  // Before each test begins, create a new request server for testing
  // & delete all art from the db
  beforeEach(function(done) {
    request = chai.request(server);
    db.sequelize.sync({ force: true }).then(function() {
      done();
    });
  });

  it("should find all art", function(done) {
    // Add some art to the db to test with
    db.Art.bulkCreate([
      {
        name: "First Example",
        description: "First Description",
        latitude: 33.78,
        longitude: -84.35
      },
      {
        name: "Second Example",
        description: "Second Description",
        latitude: 32.45,
        longitude: -82.35
      }
    ]).then(function() {
      // Request the route that returns all art
      request.get("/api/art").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({
            text: "First Example",
            description: "First Description",
            latitude: 33.78,
            longitude: -84.35
          });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({
            text: "Second Example",
            description: "Second Description",
            latitude: 32.45,
            longitude: -82.35
          });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
