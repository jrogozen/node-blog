var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

var db = require('./config/db');

var port = process.env.PORT || 8000;

var mongoose = require('mongoose');

mongoose.connect(db.url);

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.static(__dirname + '/public')); 

require('./app/routes')(app);

app.listen(port);

console.log('Magic happens on port ' + port);

exports = module.exports = app;  
