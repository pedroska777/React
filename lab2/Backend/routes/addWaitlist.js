var express = require("express");
var router = express.Router();
//Passport authentication

var passport = require("passport");
// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });

var Model = require("../mongodb");

router.post("/", function(req, res) {
  console.log("Inside Post add waitlist");
  console.log("Request Body: ", req.body);

  if (req.session.user.role === "student") {
    var query = {};
    query.courseID = req.body.courseID;
    query.instructor_name = req.body.instructor_name;
    query.userID = req.body.userID;
    query.instructorID = req.body.instructorID;
    query.waitlisted = 1;

    console.log("querry: ", query);
    Model.registration.create(query, (err, result) => {
      if (err) {
        console.log("Error in adding waitlist course", err);
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in adding waitlist course");
      } else {
        console.log("Adding waitlist to course is completed!");
        res.writeHead(200, {
          "Content-type": "text/plain"
        });
        res.end("Adding waitlist to course is completed!");
      }
    });
  }
});

module.exports = router;
