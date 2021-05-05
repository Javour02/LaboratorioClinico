var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));

app.set('port', process.env.PORT || 5600);

app.listen(app.get('port'), ()=>{
    console.log(`Server listening to port ${app.get('port')}`);
});