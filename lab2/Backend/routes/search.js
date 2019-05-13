var express = require("express");
var router = express.Router();
//Passport authentication

var passport = require("passport");
// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });
console.log("requireAuth", requireAuth);

//var Model = require("../mongodb");
var kafka = require("../kafka/client");

router.post("/", function(req, res) {
  console.log("Inside Search Method GET!");
  console.log("Request Body: ", req.body);

  kafka.make_request("search", req, function(err, result) {
    if (err) {
      console.log("Error in  search");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in  search");
    } else {
      res.writeHead(200, {
        "Content-type": "application/json"
      });
      console.log(JSON.stringify(result));
      res.end(JSON.stringify(result));
    }
  });
});

/* //Search
router.post("/", function(req, res) {
  console.log("Inside Search Method Post!");
  console.log("Request Body: ", req.body);

  const searchCourses = req.body;
  var query = {
    course_term: searchCourses.course_term,
    course_dept: searchCourses.course_dept
  };

  if (searchCourses.search_condition === "E") {
    query.courseID = searchCourses.course_dept + searchCourses.course_number;
  } else {
    query.courseID = {
      $gt: searchCourses.course_dept + searchCourses.course_number
    };
  }
  console.log("query", query);

  if (req.session.user) {
    Model.courses.find(query, (err, result) => {
      if (err) {
        console.log("Error in Retrieving courses data", err);
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in Retrieving courses data");
      } else {
        console.log("Success in Retrieving courses data", result);

        console.log(JSON.stringify(result));
        res.writeHead(200, {
          "Content-type": "application/json"
        });
        res.end(JSON.stringify(result));
      }
    });
  }
}); */

module.exports = router;
