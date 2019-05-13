var express = require("express");
var router = express.Router();
//Passport authentication

var passport = require("passport");
// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });

var Model = require("../mongodb");

router.get("/", function(req, res) {
  console.log("Inside GET user Registration ");
  console.log("Request Body:", req.body);

  if (req.session.user) {
    console.log("req.session.user:", req.session.user);
    var query = {};
    if (req.session.user.role === "student") {
      query.userID = req.session.user.userID;
    } else if (req.session.user.role === "faculty") {
      query.instructorID = req.session.user.userID;
    }
    Model.registration.find(query, (err, result) => {
      if (err) {
        console.log("Error in retrieving user registration1 data", err);
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in retrieving user registration data");
      } else {
        console.log("registration jason Data: ", JSON.stringify(result));

        res.writeHead(200, {
          "Content-type": "application/json"
        });
        res.end(JSON.stringify(result));
      }
    });
  }
});

module.exports = router;
