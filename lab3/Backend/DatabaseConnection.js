const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0-c5ims.mongodb.net/canvasdb?retryWrites=true"
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("connected", function() {
  console.log(db);
  return console.log("Successfully connected to  MongoDB Database");
});

db.once("disconnected", function() {
  return console.error("Successfully disconnected from MongoDB Database");
});

var userDetail = mongoose.model("userDetail", {
  userID: String,
  role: String,
  username: String,
  email: String,
  password: String,
  FName: String,
  LName: String,
  profile_image: String,
  phone_number: String,
  about_me: String,
  city: String,
  country: String,
  company: String,
  school: String,
  hometown: String,
  languages: String,
  gender: String
});

var courses = mongoose.model("courses", {
  courseID: String,
  course_name: String,
  course_dept: String,
  course_description: String,
  course_room: String,
  course_capacity: String,
  waitlist_capacity: String,
  course_term: String,
  instructorID: String,
  instructor_name: String
});

var registration = mongoose.model("registration", {
  courseID: String,
  instructorID: String,
  instructor_name: String,
  userID: String,
  waitlisted: String
});

var messages = mongoose.model("messages", {
  userID: String,
  sender_name: String,
  receiver_username: String,
  topic: String,
  body: String
});

var announcement = mongoose.model("announcement", {
  topic: String,
  body: String,
  courseID: String,
  instructor_name: String,
  instructorID: String
});

module.exports = {
  userDetail,
  courses,
  registration,
  announcement,
  messages
};
