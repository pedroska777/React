var express = require("express");
var router = express.Router();
//Passport authentication

var passport = require("passport");
// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });

var Model = require("../mongodb");

router.post("/", function(req, res) {
  console.log("Inside Post drop course");
  console.log("Request Body: ", req.body);

  if (req.session.user.role === "student") {
    var query = {};
    query.courseID = req.body.courseID;
    query.instructorID = req.body.instructorID;
    query.userID = req.session.user.userID;
    console.log("Delete query", query);

    Model.registration.deleteOne(query, (err, result) => {
      if (err) {
        console.log("Error in adding course", err);
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in delet course");
      } else {
        console.log("Deleting course is completed!", result);
        res.writeHead(200, {
          "Content-type": "application/json"
        });
        res.end(JSON.stringify(result));
      }
    });
  }
});

module.exports = router;
