var express = require("express");
var router = express.Router();
//Passport authentication

var passport = require("passport");
// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });

var Model = require("../mongodb");

router.get("/", function(req, res) {
  console.log("Inside GET All Registration ");
  console.log("Request Body:", req.body);

  if (req.session.user) {
    console.log("req.session.user:", req.session.user);
    Model.registration.find({}, (err, result) => {
      if (err) {
        console.log("Unable to fetch registrationAll details.", err);
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in retrieving registrationAll");
      } else {
        console.log("RegistrationAll Data: ", result);
        res.writeHead(200, {
          "Content-type": "application/json"
        });
        res.end(JSON.stringify(result));
      }
    });
  }
});

module.exports = router;
