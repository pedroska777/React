var express = require("express");
var router = express.Router();
//Passport authentication

var passport = require("passport");
// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });

var Model = require("../mongodb");

router.get("/", function(req, res) {
  console.log("Inside GET All users ");
  console.log("Request Body:", req.body);

  if (req.session.user) {
    console.log("req.session.user:", req.session.user);
    Model.userDetail.find({}, (err, result) => {
      if (err) {
        console.log("Error in retrieving users ALL data", err);
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in retrieving users All data");
      } else {
        console.log("users ALL jason Data: ", JSON.stringify(result));

        res.writeHead(200, {
          "Content-type": "application/json"
        });
        res.end(JSON.stringify(result));
      }
    });
  }
});

module.exports = router;
