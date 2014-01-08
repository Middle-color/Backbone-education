var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.listen(3344);
console.log('Listening http://localhost:3344');