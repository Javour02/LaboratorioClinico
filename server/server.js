var express = require('express');
var path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var recepcion = require('./contact/recepcion')

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "SolyLuna0802",
    database: "laboratorio"
});

var app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', process.env.PORT || 5600);

app.post('/responseRegistrarme', (req, res)=>{
    recepcion.crearUsuarios(con, req, res);
});

app.post('/responseLogin', (req,res)=>{
    recepcion.loginUsuarios(con,req, res);
});

app.post('/mostrarInfoTipo', (req,res)=>{
    recepcion.verDetallesExamen(con, req, res);
});

app.post('/agendar', (req, res)=>{
    recepcion.agendarExamen(con, req, res);
});

app.post('/logOut', (req, res)=>{
    recepcion.logOut();
    res.end();
})

app.post('/consulta', (req,res)=>{
    recepcion.consulta(con, res);
});

app.post('/obtenerUsuario', (req,res)=>{
    recepcion.obtenerInfo(con, res);
});

app.post('/update', (req,res)=>{
    recepcion.update(con, req, res);
});

app.listen(app.get('port'), ()=>{
    console.log(`Server listening to port ${app.get('port')}`);
});
// lo que sea