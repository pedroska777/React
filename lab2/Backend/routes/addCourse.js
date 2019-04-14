//Add Course

var express = require("express");
var router = express.Router();
//Passport authentication

var passport = require("passport");
// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });

var Model = require("../mongodb");

//Search
router.post("/", function(req, res) {
  console.log("Inside Post add course");
  console.log("Request Body: ", req.body);

  if (req.session.user.role === "student") {
    var query = {};
    query.courseID = req.body.courseID;
    query.instructor_name = req.body.instructor_name;
    query.userID = req.session.user.userID;
    query.instructorID = req.body.instructorID;
    query.waitlisted = 0;

    console.log("querry: ", query);
    Model.registration.create(query, (err, result) => {
      if (err) {
        console.log("Error in adding course", err);
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in adding course");
      } else {
        console.log("Adding course is completed!", result);
        res.writeHead(200, {
          "Content-type": "text/plain"
        });
        res.end("Adding course is completed!");
      }
    });
  }
});

module.exports = router;
