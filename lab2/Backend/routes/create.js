//create course

var express = require("express");
var router = express.Router();
//Passport authentication

var passport = require("passport");
// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });

var Model = require("../mongodb");

router.post("/", function(req, res) {
  console.log("Inside create");
  const data = {
    courseID: req.body.courseID,
    course_name: req.body.course_name,
    course_dept: req.body.course_dept,
    course_description: req.body.course_description,
    course_room: req.body.course_room,
    course_capacity: req.body.course_capacity,
    waitlist_capacity: req.body.waitlist_capacity,
    course_term: req.body.course_term,
    instructorID: req.session.user.userID,
    instructor_name: `${req.session.user.FName} ${req.session.user.LName}`
  };
  console.log("Inside create data:", data);

  if (req.session.user.role === "faculty") {
    console.log("req.session.user:", req.session.user);
    Model.courses.create(data, (err, result) => {
      if (err) {
        console.log("Error in creating connection!");
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in creating connection!");
      } else {
        console.log("Course created!");
        res.writeHead(200, {
          "Content-type": "text/plain"
        });
        res.end("Course Created!");
      }
    });
  }
});

module.exports = router;
