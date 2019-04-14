var express = require("express");
var router = express.Router();
//Passport authentication

var passport = require("passport");
// Set up middleware
var requireAuth = passport.authenticate("jwt", { session: false });

var pool = require("../mysql");
var mysql = require("mysql");

router.get("/", function(req, res) {
  console.log("Inside Home Login");
  res.writeHead(200, {
    "Content-Type": "application/json"
  });
  res.end("inside Home");
});
module.exports = router;
