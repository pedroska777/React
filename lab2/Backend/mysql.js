var mysql = require("mysql");

var pool = mysql.createPool({
  connectionLimit: 200,
  host: "localhost",
  user: "root",
  password: "7619",
  database: "canvasdb",
  port: "3306",
  multipleStatements: true
});

module.exports = pool;
