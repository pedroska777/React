var Model = require("../mongodb");
var mongooseTypes = require("mongoose").Types;

function handle_request(message, callback) {
  console.log("Inside Kafka Backend Search");
  console.log("Message body: ", message.body);

  const searchCourses = message.body;
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

  Model.courses.find(query, (err, result) => {
    if (err) {
      console.log("Error in Retrieving courses data", err);

      callback(err, null);
    } else {
      console.log("Success in Retrieving courses data", result);

      console.log(JSON.stringify(result));

      callback(null, result);
    }
  });
}

exports.handle_request = handle_request;
