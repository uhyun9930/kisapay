var express = require('express');
var app=express();
var request = require('request');
var path = require('path');
var cors = require('xml2js');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password : '774kuhqwe*',
    database : 'kisapay'
});

connection.connect();

app.use(express.urlencoded());
app.use(express.json()); //바디 파서 대신 쓰는 것

console.log(path.join(__dirname,'views'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(cors());


app.use(express.static('public'));

app.get('/main', function(req, res){
    res.render('join');
})


app.post('/main', function(req, res){
    var name=req.body.name;
    var id=req.body.id;
    var password=req.body.password;

    console.log(name + "님, 회원가입 시작");

    connection.query('INSERT into user (userid, username, userpassword) VALUES (?,?,?)',[id,name,password],
    function (error, results, fields) {
       if (error){ throw error; }
       else {
           console.log(results);
           res.json(1);
       }
     });
     
     
})

app.listen(3000);
