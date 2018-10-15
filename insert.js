var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO customers VALUES ?";
  var values = [
    [1,'Saran'],
    [2,'Aravindh'],
    [3,'Vasu'],
    [4,'Sathish'],
    [5,'Santhosh'],
    [6,'Sandy'],
    
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});