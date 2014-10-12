var express = require('express'); 
var mongodb = require('mongodb').MongoClient; 
var objectID = require('mongodb').ObjectID; 
var bodyParser = require('body-parser'); 

var app = express(); 

app.use(bodyParser.json());

app.get('/', function(req, res){
}); 
