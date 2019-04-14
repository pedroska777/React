var express = require("express");
var router = express.Router();
//Passport authentication

var passport = require("passport");
// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });
var Model = require("../mongodb");

router.get("/", function(req, res) {
  console.log("Inside GET inbox ");
  console.log("Request Body:", req.body);

  if (req.session.user) {
    console.log("req.session.user:", req.session.user);

    Model.messages.find(
      { receiver_username: req.session.user.username },
      (err, result) => {
        if (err) {
          console.log("Error in retrieving messages data", err);
          res.writeHead(400, {
            "Content-type": "text/plain"
          });
          res.end("Error in retrieving messages data");
        } else {
          console.log("Success in retrieving messages data", result);

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
