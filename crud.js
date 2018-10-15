var express = require('express');
var app = express();
var http =require('http');
var path=require('path');
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
var mysql=require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:"customers"
   })
   //Register
   app.post('/register', function(req,res){
    var createNames = {
        id: req.body.id,
        user: req.body.user,
        email:req.body.email,
        fname:req.body.fname,
        lname:req.body.lname,
        pass:req.body.pass
    }
    connection.query("insert into customers set ?",createNames, function(err, result){

        if(err)throw err;
        console.log(result);
        //res.send('User saved successfully!');
        res.sendFile(__dirname + "/" +"Login.html");
        
    })    
})
   //Login
   app.post('/login', function(req,res){
    var user= req.body.user;
    var password = req.body.pass;
    connection.query('SELECT * FROM customers WHERE user = ?',[user], function (err, results) {
        if(err)throw err;
        else{
        if(results.length >0){
        if(results[0].password == password){
            res.sendFile(__dirname + "/" +"forms.html");
        }
        else{
          res.send("Username and password does not match");
        }
      }
      else{
        res.send("Username does not exits");
      }
    }
   })
   })
  //ADD USER
app.post('/create', function(req,res){
    var createNames = {
        id: req.body.id,
        user: req.body.name,
        email:req.body.email
    }
    connection.query("insert into customers set ?",createNames, function(err, result){

        if(err)throw err;
        console.log(result);
        res.send('User saved successfully!');
        res.sendFile(__dirname + "/" +"forms.html");
        
    })    
})
//Display User
app.post('/listUser', function(req,res){
connection.query("SELECT* FROM customers ",function(err, result){
     if(err)throw err;
     console.log(result);
     res.send(result);
     res.sendFile(__dirname + "/" +"forms.html");
   
 })    
});
//By ID
app.post('/User', function(req,res){
    var id= req.body.id;
connection.query("SELECT* FROM customers WHERE id = ?",id, function(err, result){
     if(err)throw err;
     console.log(result);
     res.send(result);
     res.sendFile(__dirname + "/" +"forms.html");
   
 })    
});
//Delete By ID
app.post('/delete', function(req,res){
    var id= req.body.id;
connection.query("DELETE FROM customers WHERE id = ?",id, function(err, result){
     if(err)throw err;
     console.log(result);
     res.send('User Deleted successfully!');
     res.sendFile(__dirname + "/" +"forms.html");
   
 })    
});
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
  
  })