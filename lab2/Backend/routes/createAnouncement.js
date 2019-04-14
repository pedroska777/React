var express = require("express");
var router = express.Router();
//Passport authentication

var passport = require("passport");
// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });

var Model = require("../mongodb");

router.post("/", function(req, res) {
  console.log("Inside Post announcement");
  console.log("Request Body: ", req.body);

  if (req.session.user.role === "faculty") {
    const query = {
      topic: req.body.topic,
      body: req.body.body,
      courseID: req.body.courseID,
      instructor_name: req.session.user.FName + " " + req.session.user.LName,
      instructorID: req.session.user.userID
    };
    Model.announcement.create(query, (err, result) => {
      if (err) {
        console.log("Error in inserting announcement", err);
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error ");
      } else {
        console.log("Announcement update complete!");
        res.writeHead(200, {
          "Content-type": "text/plain"
        });
        res.end("Announcement update complete!");
      }
    });
  }
});

module.exports = router;
