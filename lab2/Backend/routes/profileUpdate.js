var express = require("express");
var router = express.Router();
//Passport authentication

var passport = require("passport");
// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });

var Model = require("../mongodb");

//Update Profile data

router.post("/", function(req, res) {
  console.log("Inside Post profile");
  console.log("Request Body: ", req.body);

  if (req.session.user) {
    Model.userDetail.findOne(
      {
        userID: req.session.user.userID
      },
      (err, result) => {
        if (err) {
          console.log("Unable to fetch user details.", err);
          res.writeHead(400, {
            "Content-type": "text/plain"
          });
          res.end("Error in creating connection!");
        } else {
          console.log("Userdetails", result);

          result.FName = req.body.FName;
          result.LName = req.body.LName;
          result.email = req.body.email;
          result.about_me = req.body.about_me;
          result.country = req.body.country;
          result.city = req.body.city;
          result.gender = req.body.gender;
          result.hometown = req.body.hometown;
          result.school = req.body.school;
          result.company = req.body.company;
          result.languages = req.body.languages;
          result.phone_number = req.body.phone_number;
          result.profile_image = req.body.profile_image;

          result.save().then(
            doc => {
              console.log("Success in updating profile data", doc);

              res.writeHead(200, {
                "Content-type": "text/plain"
              });
              res.end("Profile data update complete!");
            },
            err => {
              console.log("Error in updating profile data", err);
              res.writeHead(400, {
                "Content-type": "text/plain"
              });
              res.end("Error in updating profile data");
            }
          );
        }
      }
    );
  }
});

module.exports = router;
