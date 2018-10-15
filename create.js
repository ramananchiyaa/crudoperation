var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "customers"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE customers (id int, fname VARCHAR(255), lname VARCHAR(255),user VARCHAR(255) , email VARCHAR(255),pass VARCHAR(225))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});