var express = require("express");
var router = express.Router();
//Passport authentication

var passport = require("passport");
// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });

var Model = require("../mongodb");

router.get("/", function(req, res) {
  console.log("Inside GET All courses ");
  console.log("Request Body:", req.body);

  if (req.session.user) {
    console.log("req.session.user:", req.session.user);
    query = {};
    query.instructorID = req.session.user.userID;
    Model.courses.find(query, (err, result) => {
      if (err) {
        console.log("Error in retrieving courses ALL data", err);
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in retrieving courses All data");
      } else {
        console.log("courses ALL jason Data: ", JSON.stringify(result));

        res.writeHead(200, {
          "Content-type": "application/json"
        });
        res.end(JSON.stringify(result));
      }
    });
  }
});

module.exports = router;
