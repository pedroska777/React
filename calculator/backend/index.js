//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");

app.use(bodyParser.json());
app.set("view engine", "ejs");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

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

app.post("/", function(req, res) {
  console.log("inside post", req.body.currnum, req.body.prevnum);
  if (
    isNaN(parseFloat(req.body.currnum)) ||
    isNaN(parseFloat(req.body.prevnum))
  ) {
    console.log("Invalid Number ");
    res.status(400).json({ error: "Enter valid number" });
  } else {
    let opt = req.body.operator;
    if (opt === "plus") {
      var output = parseFloat(req.body.currnum) + parseFloat(req.body.prevnum);
    } else if (opt === "subtract") {
      var output = parseFloat(req.body.prevnum) - parseFloat(req.body.currnum);
    } else if (opt === "multiply") {
      var output = parseFloat(req.body.currnum) * parseFloat(req.body.prevnum);
    } else if (opt === "divide") {
      var output = parseFloat(req.body.prevnum) / parseFloat(req.body.currnum);
    }

    console.log("Result ", output);
    res.status(201).json({ output: output });
  }
});

app.listen(3001);
console.log("Server Listening on port 3001");
