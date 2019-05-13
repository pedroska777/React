var Model = require("../mongodb");
var bcrypt = require("bcrypt-nodejs");
var mongooseTypes = require("mongoose").Types;

function handle_request(message, callback) {
  console.log("Inside Kafka Backend Signup");
  console.log("Message: ", message);
  const hashed = bcrypt.hashSync(message.password);
  if (!bcrypt.compareSync("12345", hashedPassword)) {
    console.log("Invalid Credentials in signup page!", hashed);
  } else {
    console.log("Valid Credentials in signup page!", hashed);
  }

  //User creation query

  const profileId = mongooseTypes.ObjectId();

  //Check if user exists

  Model.userDetail.findOne(
    {
      userID: message.userID
    },
    (err, user) => {
      if (err) {
        console.log("Unable to fetch user details.", err);
        callback(err, null);
      } else {
        if (user) {
          console.log("User Exists!", user);
          console.log("Duplicate user");
          callback(null, null);
        } else {
          //Hashing Password!
          const hashedPassword = bcrypt.hashSync(message.password);
          if (!bcrypt.compareSync("12345", hashedPassword)) {
            console.log("Invalid Credentials in signup page!", hashedPassword);
          } else {
            console.log("Valid Credentials in signup page!", hashedPassword);
          }

          var user = new Model.userDetail({
            userID: message.userID,
            password: hashedPassword,
            username: message.username,
            FName: message.firstname,
            LName: message.lastname,
            email: message.email,
            profile_image: "default-profile-image.jpg",
            role: message.role,
            ProfileId: profileId
          });
        }

        user.save().then(
          doc => {
            console.log("User saved successfully.", doc);
            callback(null, doc);
          },
          err => {
            console.log("Unable to save user details.", err);
            callback(err, null);
          }
        );
      }
    }
  );
}

exports.handle_request = handle_request;
