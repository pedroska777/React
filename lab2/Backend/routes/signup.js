var express = require("express");
var router = express.Router();

//Kafka
var kafka = require("../kafka/client");

var Model = require("../mongodb");
var bcrypt = require("bcrypt-nodejs");
var mongooseTypes = require("mongoose").Types;

router.post("/", function(req, res) {
  console.log("Inside Signup POST");
  console.log("Request Body: ", req.body);

  kafka.make_request("signup", req.body, function(err, result) {
    console.log("In results Signup");
    console.log("Results: ", result);
    if (result) {
      console.log("User saved successfully.");
      res.writeHead(200, {
        "Content-type": "text/plain"
      });
      res.end("Adding a user successful!");
    } else if (result == null) {
      console.log("User already exists.");
      res.writeHead(210, {
        "Content-type": "text/plain"
      });
      res.end("Dupplicate user!");
    }

    if (err) {
      console.log("Unable to fetch user details. Error in Signup.", err);
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in fetching user details!");
    }
  });
});

/* router.post("/", function(req, res) {
  console.log("Inside Signup POST Mongo");
  console.log("Request Body: ", req.body);
  const profileId = mongooseTypes.ObjectId();

  Model.userDetail.findOne(
    {
      userID: req.body.userID
    },
    (err, user) => {
      if (err) {
        console.log("Unable to fetch user details.", err);
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in creating connection!");
      } else {
        if (user) {
          console.log("User Exists!", user);
          res.writeHead(210, {
            "Content-type": "text/plain"
          });
          res.end("User Already Exists");
        } else {
          //Hashing Password!
          const hashedPassword = bcrypt.hashSync(req.body.password);

          var user = new Model.userDetail({
            userID: req.body.id,
            password: hashedPassword,
            username: req.body.username,
            FName: req.body.firstname,
            LName: req.body.lastname,
            email: req.body.email,
            profile_image: "default-profile-image.jpg",
            role: req.body.role,
            ProfileId: profileId
          });
        }

        user.save().then(
          doc => {
            console.log("User saved successfully.", doc);
            res.writeHead(200, {
              "Content-type": "text/plain"
            });
            res.end("Adding a user successful!");
          },
          err => {
            console.log("Unable to save user details.", err);
            res.writeHead(401, {
              "Content-type": "text/plain"
            });
            res.end("Error in adding an user2");
          }
        );
      }
    }
  );
}); */

module.exports = router;
