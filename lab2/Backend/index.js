//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
app.set("view engine", "ejs");

const multer = require("multer");
const uuidv4 = require("uuid/v4");
const path = require("path");
const fs = require("fs");
var pool = require("./mysql.js");

var mysql = require("mysql");
var bcrypt = require("bcrypt-nodejs");

var passport = require("passport");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//use express session to maintain session data
app.use(
  session({
    secret: "cmpe273_canvasdb",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 15 * 60 * 1000
  })
);

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.use(passport.initialize());

// Bring in defined Passport Strategy
require("./config/passport")(passport);

//Storing Images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

//uplaod image

const upload = multer({ storage });

app.post("/upload", upload.array("photos", 5), (req, res) => {
  console.log("req.body", req.body);
  res.end();
});

//download image

app.post("/download/:file(*)", (req, res) => {
  console.log("Inside Download File");
  var file = req.params.file;
  var filelocation = path.join(__dirname + "/uploads", file);
  var img = fs.readFileSync(filelocation);
  var base64img = new Buffer(img).toString("base64");
  res.writeHead(200, {
    "Content--type": "image/jpg"
  });
  res.end(base64img);
});

var login = require("./routes/login.js");
var signup = require("./routes/signup");
var profile = require("./routes/profileDetails");
var profileUpdate = require("./routes/profileUpdate");
var search = require("./routes/search");

var announcement = require("./routes/announcement");
var createAnnouncement = require("./routes/createAnouncement");

var registrationAll = require("./routes/registrationAll");
var registration = require("./routes/registration");
var courses = require("./routes/courses");
var users = require("./routes/users");
var create = require("./routes/create");
var addCourse = require("./routes/addCourse");
var addWaitlist = require("./routes/addWaitlist");
var dropCourse = require("./routes/dropcourse");

var home = require("./routes/home");
var inbox = require("./routes/inbox");
var sendMessage = require("./routes/sendMessage");

app.use("/login", login);
app.use("/signup", signup);
app.use("/profile", profile);
app.use("/profileUpdate", profileUpdate);
app.use("/search", search);
app.use("/announcement", announcement);
app.use("/inbox", inbox);

app.use("/createAnnouncement", createAnnouncement);
app.use("/registrationAll", registrationAll);
app.use("/registration", registration);
app.use("/courses", courses);
app.use("/users", users);
app.use("/create", create);
app.use("/addCourse", addCourse);
app.use("/addWaitlist", addWaitlist);
app.use("/dropCourse", dropCourse);
app.use("/home", home);
app.use("/sendMessage", sendMessage);

//start your server on port 3001
module.exports = app;
app.listen(3001);
console.log("Server Listening on port 3001");
