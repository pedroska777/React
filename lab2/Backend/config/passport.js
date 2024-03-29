"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;

var Model = require("../mongodb");
const secret = "secret";

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
  };
  passport.use(
    new JwtStrategy(opts, function(jwt_payload, callback) {
      console.log("payload received in passport config", jwt_payload);
      Model.userDetail.findOne(
        {
          userID: jwt_payload.userID
        },
        (err, res) => {
          if (res) {
            var user = res;
            delete user.password;
            callback(null, user);
          } else {
            callback(err, false);
          }
        }
      );
    })
  );
};
