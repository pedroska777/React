var express = require("express");
var router = express.Router();
//Passport authentication

var passport = require("passport");
// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });

var Model = require("../mongodb");

router.post("/", function(req, res) {
  console.log("Inside Post sendMessage");
  console.log("Request Body: ", req.body);

  const query = {
    topic: req.body.topic,
    body: req.body.body,
    userID: req.session.user.userID,
    sender_name: req.session.user.FName + " " + req.session.user.LName,
    receiver_username: req.body.receiver_username
  };
  console.log("message querry", query);

  Model.messages.create(query, (err, result) => {
    if (err) {
      console.log("Error in inserting Message", err);
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error ");
    } else {
      console.log("Message update complete!");
      res.writeHead(200, {
        "Content-type": "text/plain"
      });
      res.end("Message update complete!");
    }
  });
});

module.exports = router;
