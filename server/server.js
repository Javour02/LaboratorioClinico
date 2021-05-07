var express = require('express');
var path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var con = mysql.connect({
    host: "localhost",
    user: "root",
    password: "SolyLuna0802",
    database: "laboratorio"
});

var app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 5600);

app.listen(app.get('port'), ()=>{
    console.log(`Server listening to port ${app.get('port')}`);
});
// lo que sea