var express = require("express");
var router = express.Router();
var Model = require("../mongodb");
var bcrypt = require("bcrypt-nodejs");

var kafka = require("../kafka/client");

//Passport authentication

var passport = require("passport");
var jwt = require("jsonwebtoken");
// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });
const secret = "secret";

//Login validation
router.post("/", function(req, res) {
  console.log("Inside login POST");
  console.log("Request Body: ", req.body);

  //Kafka request

  kafka.make_request("login", req.body, function(err, result) {
    console.log("In results login bCKEND");
    console.log("results", result);
    if (err) {
      console.log("Inside err login");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in login!");
    } else {
      console.log("Inside results Login");
      if (result) {
        req.session.user = result;

        // Create token if the password matched and no error was thrown
        var token = jwt.sign(result, secret, {
          expiresIn: 10080 // in seconds
        });
        console.log("results after token:", token);
        res.cookie("cookie", result.userID, {
          maxAge: 360000,
          httpOnly: false,
          path: "/"
        });
        res.cookie("Role", result.role, {
          maxAge: 360000,
          httpOnly: false,
          path: "/"
        });

        //res.json({success: true, token: 'JWT ' + token});
        res.writeHead(200, {
          "Content-type": "text/plain"
        });

        //res.status(200).json({success: true, Authorization: 'Bearer ' + token});
        var Result = {
          userID: result.userID,
          role: result.role,
          Token: token
        };

        res.end(JSON.stringify(Result));
      } else {
        res.writeHead(401, {
          "Content-type": "text/plain"
        });
        console.log("Invalid Credentials!");
        res.end("Invalid Credentials!");
      }
    }
  });

  //Query
});

/* router.post("/", function(req, res) {
  console.log("Inside login POST");
  console.log("Req Body: ", req.body);

  Model.userDetail.findOne(
    {
      userID: req.body.userID
    },
    (err, result) => {
      if (err) {
        console.log("Unable to fetch user details.", err);
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in creating connection!");
      } else {
        if (result) {
          console.log("User details ", result);
          if (!bcrypt.compareSync(req.body.password, result.password)) {
            console.log("Invalid Credentials!");
            res.writeHead(401, {
              "Content-type": "text/plain"
            });
            res.end("Invalid Credentials!");
          } else {
            var token = jwt.sign(JSON.parse(JSON.stringify(result)), secret, {
              expiresIn: 10000 // in seconds
            });

            res.cookie("cookie", result.userID, {
              maxAge: 360000,
              httpOnly: false,
              path: "/"
            });
            res.cookie("Role", result.role, {
              maxAge: 360000,
              httpOnly: false,
              path: "/"
            });
            req.session.user = result;
            res.writeHead(200, {
              "Content-type": "text/plain"
            });
            console.log("Login successful!");
            var Result = {
              firstname: result.FName,
              eole: result.role,
              Token: token
            };

            res.end(JSON.stringify(Result));
          }
        } else {
          console.log("Invalid Credentials!");
          res.writeHead(401, {
            "Content-type": "text/plain"
          });
          res.end("Invalid Credentials!");
        }
      }
    }
  );
}); */

module.exports = router;
