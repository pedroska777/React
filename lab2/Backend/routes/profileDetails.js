var express = require("express");
var router = express.Router();
//Passport authentication

var passport = require("passport");
// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });

var Model = require("../mongodb");

//Profile Details
router.get("/", function(req, res) {
  console.log("Inside GET Profile ");
  console.log("Request Body:", req.body);

  if (req.session.user) {
    console.log("req.session.user:", req.session.user);
    Model.userDetail.findOne(
      {
        userID: req.session.user.userID
      },
      (err, result) => {
        if (err) {
          console.log("Unable to fetch user details.", err);
          console.log("Error in retrieving profile data");
          res.writeHead(400, {
            "Content-type": "text/plain"
          });
          res.end("Error in retrieving profile data");
        } else {
          console.log("Profile Data: ", result);
          res.writeHead(200, {
            "Content-type": "application/json"
          });
          res.end(JSON.stringify(result));
        }
      }
    );
  }
});

module.exports = router;
