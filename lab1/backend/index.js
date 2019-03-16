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

var Users = [
  {
    username: "admin",
    password: "admin"
  }
];

var books = [
  { BookID: "1", Title: "Book 1", Author: "Author 1" },
  { BookID: "2", Title: "Book 2", Author: "Author 2" },
  { BookID: "3", Title: "Book 3", Author: "Author 3" }
];

app.post("/signup", function(req, res) {
  console.log("Inside Signup POST");
  console.log("Request Body: ", req.body);

  //User creation

  var presql = "SELECT * from user where userID = " + mysql.escape(req.body.id);
  console.log("presql: ", presql);

  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in creating connection!");
    } else {
      conn.query(presql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-type": "text/plain"
          });
          console.log("Error in adding an user with query error");
          res.end("Error in adding an user with query error");
        } else {
          if (result[0]) {
            console.log("result0= User Already Exists", result[0]);
            //var sql = "UPDATE userdetails set Accounttype = 3";
          } else {
            console.log("result01=", result[0]);

            //Hashing Password!
            const hashedPassword = bcrypt.hashSync(req.body.password);

            var sql =
              "INSERT into user (userID,Username, Password, Fname, Lname, Email, Role) VALUES(" +
              mysql.escape(req.body.id) +
              "," +
              mysql.escape(req.body.email) +
              "," +
              mysql.escape(hashedPassword) +
              "," +
              mysql.escape(req.body.firstname) +
              "," +
              mysql.escape(req.body.lastname) +
              "," +
              mysql.escape(req.body.email) +
              "," +
              mysql.escape(req.body.role) +
              ");";

            console.log("sql querry: ", sql);
          }

          conn.query(sql, function(err, result) {
            if (err) {
              console.log("Error in adding an user2");
              res.writeHead(401, {
                "Content-type": "text/plain"
              });
              res.end("Error in adding an user2");
            } else {
              console.log("Adding a user successful!");
              res.writeHead(200, {
                "Content-type": "text/plain"
              });
              res.end("Adding a user successful!");
            }
          });
        }
      });
    }
  });
});

app.post("/login", function(req, res) {
  console.log("Inside login POST");
  console.log("Req Body: ", req.body);

  pool.getConnection(function(err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in creating connection!");
    } else {
      var sql =
        "SELECT * from user WHERE userID = " + mysql.escape(req.body.userID);
      conn.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Invalid Credentials!");
        } else {
          if (
            result.length == 0 ||
            !bcrypt.compareSync(req.body.password, result[0].password)
          ) {
            res.writeHead(401, {
              "Content-type": "text/plain"
            });
            console.log("Invalid Credentials!");
            res.end("Invalid Credentials!");
          } else {
            console.log(result);
            res.cookie("cookie", result[0].userID, {
              maxAge: 360000,
              httpOnly: false,
              path: "/"
            });
            res.cookie("Role", result[0].role, {
              maxAge: 360000,
              httpOnly: false,
              path: "/"
            });
            req.session.user = result[0];
            res.writeHead(200, {
              "Content-type": "text/plain"
            });
            console.log("Login successful!");
            res.end("Login successful!");
          }
        }
      });
    }
  });
});

//Profile Details
app.get("/profile", function(req, res) {
  console.log("Inside GET Profile ");
  console.log("Request Body:", req.body);

  if (req.session.user) {
    pool.getConnection(function(err, conn) {
      if (err) {
        console.log("Error in creating connection!");
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in creating connection!");
      } else {
        var sql =
          "SELECT * from user where userID = " +
          mysql.escape(req.session.user.userID);
        console.log("UserID : ", req.session.user.userID);
        conn.query(sql, function(err, result) {
          if (err) {
            console.log("Error in retrieving profile data");
            res.writeHead(400, {
              "Content-type": "text/plain"
            });
            res.end("Error in retrieving profile data");
          } else {
            console.log(
              "Profile Data: ",
              result,
              typeof result,
              typeof result[0]
            );
            console.log("Profile jason Data: ", JSON.stringify(result[0]));

            res.writeHead(200, {
              "Content-type": "application/json"
            });
            res.end(JSON.stringify(result[0]));
          }
        });
      }
    });
  }
});

//Update Profile data

app.post("/profile", function(req, res) {
  console.log("Inside Post profile");
  console.log("Request Body: ", req.body);

  if (req.session.user) {
    pool.getConnection(function(err, conn) {
      if (err) {
        console.log("Error in creating connection!");
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in creating connection!");
      } else {
        var sql =
          "UPDATE user set " +
          "FName = " +
          mysql.escape(req.body.FName) +
          "," +
          "LName = " +
          mysql.escape(req.body.LName) +
          "," +
          "email = " +
          mysql.escape(req.body.email) +
          "," +
          "phone_number = " +
          mysql.escape(req.body.phone_number) +
          "," +
          "about_me= " +
          mysql.escape(req.body.about_me) +
          "," +
          "country = " +
          mysql.escape(req.body.country) +
          "," +
          "city = " +
          mysql.escape(req.body.city) +
          "," +
          "gender = " +
          mysql.escape(req.body.gender) +
          "," +
          "hometown = " +
          mysql.escape(req.body.hometown) +
          "," +
          "school = " +
          mysql.escape(req.body.school) +
          "," +
          "company = " +
          mysql.escape(req.body.company) +
          "," +
          "languages = " +
          mysql.escape(req.body.languages) +
          "," +
          "profile_image = " +
          mysql.escape(req.body.profile_image) +
          " WHERE userID = " +
          req.session.user.userID;

        conn.query(sql, function(err, result) {
          if (err) {
            console.log("Error in updating profile data");
            res.writeHead(400, {
              "Content-type": "text/plain"
            });
            res.end("Error in updating profile data");
          } else {
            console.log("Profile data update complete!");
            res.writeHead(200, {
              "Content-type": "text/plain"
            });
            res.end("Profile data update complete!");
          }
        });
      }
    });
  }
});

//Search
app.post("/search", function(req, res) {
  console.log("Inside Search Method Post!");
  console.log("Request Body: ", req.body);

  const searchCourses = req.body;

  if (req.session.user.role) {
    pool.getConnection(function(err, conn) {
      if (err) {
        console.log("Error in creating connection!");
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in creating connection!");
      } else {
        //Search courses Query
        var presql;

        if (searchCourses.search_condition === "E") {
          presql =
            "='" +
            searchCourses.course_dept +
            searchCourses.course_number +
            "'";
        } else {
          presql =
            ">'" +
            searchCourses.course_dept +
            searchCourses.course_number +
            "'";
        }

        var sql =
          "SELECT * from courses WHERE " +
          "course_term = " +
          mysql.escape(searchCourses.course_term) +
          " AND course_dept =" +
          mysql.escape(searchCourses.course_dept) +
          " AND courseID" +
          presql;

        console.log("sql for search=", sql);

        conn.query(sql, function(err, result) {
          if (err) {
            console.log("Error in Retrieving courses data", err);
            res.writeHead(400, {
              "Content-type": "text/plain"
            });
            res.end("Error in Retrieving courses data");
          } else {
            console.log(JSON.stringify(result));
            res.writeHead(200, {
              "Content-type": "application/json"
            });
            res.end(JSON.stringify(result));
          }
        });
      }
    });
  }
});

app.get("/registration", function(req, res) {
  console.log("Inside GET user Registration ");
  console.log("Request Body:", req.body);

  if (req.session.user) {
    pool.getConnection(function(err, conn) {
      if (err) {
        console.log("Error in creating connection!", err);
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in creating connection!");
      } else {
        var sql;
        if (req.session.user.role === "student") {
          sql =
            "SELECT * from registration where user_userID = " +
            mysql.escape(req.session.user.userID);
        } else if (req.session.user.role === "faculty") {
          sql =
            "SELECT * from registration where courses_instructor = " +
            mysql.escape(req.session.user.FName + " " + req.session.user.LName);
        }

        console.log("sql:", sql);
        console.log("UserID : ", req.session.user.userID);
        conn.query(sql, function(err, result) {
          if (err) {
            console.log("Error in retrieving user registration1 data", err);
            res.writeHead(400, {
              "Content-type": "text/plain"
            });
            res.end("Error in retrieving user registration data");
          } else {
            console.log("registration jason Data: ", JSON.stringify(result));

            res.writeHead(200, {
              "Content-type": "application/json"
            });
            res.end(JSON.stringify(result));
          }
        });
      }
    });
  }
});
app.get("/registrationAll", function(req, res) {
  console.log("Inside GET All Registration ");
  console.log("Request Body:", req.body);

  if (req.session.user) {
    pool.getConnection(function(err, conn) {
      if (err) {
        console.log("Error in creating connection!", err);
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in creating connection!");
      } else {
        var sql = "select * from registration;";
        console.log("sql:", sql);
        conn.query(sql, function(err, result) {
          if (err) {
            console.log("Error in retrieving registration ALL data", err);
            res.writeHead(400, {
              "Content-type": "text/plain"
            });
            res.end("Error in retrieving registration All data");
          } else {
            console.log(
              "registration ALL jason Data: ",
              JSON.stringify(result)
            );

            res.writeHead(200, {
              "Content-type": "application/json"
            });
            res.end(JSON.stringify(result));
          }
        });
      }
    });
  }
});

//Route to get All Books when user visits the Home Page
app.get("/home", (req, res) => {
  console.log("Inside Home Login");
  res.writeHead(200, {
    "Content-Type": "application/json"
  });
  res.end(JSON.stringify(books));
});

app.post("/create", (req, res) => {
  console.log("Inside create");
  const data = {
    courseID: req.body.courseID,
    course_name: req.body.course_name,
    course_dept: req.body.course_dept,
    course_description: req.body.course_description,
    course_room: req.body.course_room,
    course_capacity: req.body.course_capacity,
    waitlist_capacity: req.body.waitlist_capacity,
    course_term: req.body.course_term
  };

  if (req.session.user.role === "faculty") {
    pool.getConnection(function(err, conn) {
      if (err) {
        console.log("Error in creating connection!");
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in creating connection!");
      } else {
        var sql =
          "insert into courses(courseID, course_name, course_dept, course_description, course_room, course_capacity, waitlist_capacity,course_term,instructor) " +
          "values (" +
          mysql.escape(req.body.courseID) +
          "," +
          mysql.escape(req.body.course_name) +
          "," +
          mysql.escape(req.body.course_dept) +
          "," +
          mysql.escape(req.body.course_description) +
          "," +
          mysql.escape(req.body.course_room) +
          "," +
          mysql.escape(req.body.course_capacity) +
          "," +
          mysql.escape(req.body.waitlist_capacity) +
          "," +
          mysql.escape(req.body.course_term) +
          "," +
          mysql.escape(req.session.user.FName + " " + req.session.user.LName) +
          ");";

        console.log("create course sql", sql);

        conn.query(sql, function(err, result) {
          if (err) {
            console.log("Error in creating courses");
            res.writeHead(400, {
              "Content-type": "text/plain"
            });
            res.end("Error in creating courses");
          } else {
            console.log("Course created!");
            res.writeHead(200, {
              "Content-type": "text/plain"
            });
            res.end("Course Created!");
          }
        });
      }
    });
  }
});

//Add Course

app.post("/addCourse", function(req, res) {
  console.log("Inside Post add course");
  console.log("Request Body: ", req.body);

  if (req.session.user.role === "student") {
    pool.getConnection(function(err, conn) {
      if (err) {
        console.log("Error in creating connection!");
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in creating connection!");
      } else {
        var sql =
          "INSERT into registration (courses_courseID,courses_instructor,user_userID,waitlisted) VALUES(" +
          mysql.escape(req.body.courseID) +
          "," +
          mysql.escape(req.body.instructor) +
          "," +
          mysql.escape(req.session.user.userID) +
          ",0);";

        console.log("sql querry: ", sql);

        conn.query(sql, function(err, result) {
          if (err) {
            console.log("Error in adding course", err);
            res.writeHead(400, {
              "Content-type": "text/plain"
            });
            res.end("Error in adding course");
          } else {
            console.log("Adding course is completed!");
            res.writeHead(200, {
              "Content-type": "text/plain"
            });
            res.end("Adding course is completed!");
          }
        });
      }
    });
  }
});

app.post("/addWaitlist", function(req, res) {
  console.log("Inside Post add waitlist");
  console.log("Request Body: ", req.body);

  if (req.session.user.role === "student") {
    pool.getConnection(function(err, conn) {
      if (err) {
        console.log("Error in creating connection!");
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in creating connection!");
      } else {
        var sql =
          "INSERT into registration (courses_courseID,courses_instructor,user_userID,waitlisted) VALUES(" +
          mysql.escape(req.body.courseID) +
          "," +
          mysql.escape(req.body.instructor) +
          "," +
          mysql.escape(req.session.user.userID) +
          ",1);";

        console.log("sql querry: ", sql);

        conn.query(sql, function(err, result) {
          if (err) {
            console.log("Error in adding waitlist course", err);
            res.writeHead(400, {
              "Content-type": "text/plain"
            });
            res.end("Error in adding waitlist course");
          } else {
            console.log("Adding waitlist to course is completed!");
            res.writeHead(200, {
              "Content-type": "text/plain"
            });
            res.end("Adding waitlist to course is completed!");
          }
        });
      }
    });
  }
});

app.post("/dropCourse", function(req, res) {
  console.log("Inside Post drop course");
  console.log("Request Body: ", req.body);

  if (req.session.user.role === "student") {
    pool.getConnection(function(err, conn) {
      if (err) {
        console.log("Error in creating connection!");
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in creating connection!");
      } else {
        var sql =
          "Delete from registration where courses_courseID=" +
          mysql.escape(req.body.courseID) +
          "AND courses_instructor=" +
          mysql.escape(req.body.instructor) +
          "AND user_userID=" +
          mysql.escape(req.session.user.userID) +
          ";";

        console.log("sql querry: ", sql);

        conn.query(sql, function(err, result) {
          if (err) {
            console.log("Error in adding course", err);
            res.writeHead(400, {
              "Content-type": "text/plain"
            });
            res.end("Error in delet course");
          } else {
            console.log("Deleting course is completed!");
            res.writeHead(200, {
              "Content-type": "text/plain"
            });
            res.end("deleting course is completed!");
          }
        });
      }
    });
  }
});

app.post("/delete", (req, res) => {
  console.log("Inside delete");
  const deleteID = req.body.BookID;
  console.log(deleteID);

  books = books.filter(b => b.BookID !== deleteID);

  res.writeHead(200, {
    "Content-Type": "application/json"
  });
  console.log("Books : ", JSON.stringify(books));
  res.end(JSON.stringify(books));
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
