var assert = require("chai").assert;
var request = require("request");
var app = require("../index");

var chai = require("chai");
chai.use(require("chai-http"));
var expect = require("chai").expect;

var agent = require("chai").request.agent(app);

it("post announcement", function(done) {
  request.post(
    "/announcement",
    { form: { topic: "Welcom", body: "Welcome to this course" } },
    function(error, response, body) {
      //assert.equal(200, response.statusCode);
      done();
    }
  );
});
