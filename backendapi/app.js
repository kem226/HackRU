var express = require('express'); 
var mongo = require('mongodb').MongoClient; 
var objectID = require('mongodb').ObjectID; 
var bodyParser = require('body-parser'); 
var ordrinapi = require('ordrin-api');
var request = require('request');

var app = express(); 
var dblink = process.env.MONGO_DB_LINK;
var ordrkey = process.env.ORDRIN_API_KEY;

var ordrin = new ordrinapi.APIs(ordrkey, ordrinapi.TEST);

app.use(bodyParser.json());

app.use(function(req, res, next){
	//allow all sites	-- change this 
	res.setHeader('Access-Control-Allow-Origin', '*');
			
	//allow spefic methods
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
				
	//allow something
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	//next function
	next();
});

app.get('/', function(req, res){
	res.json({
		'msg': 'hi'
	});
}); 

app.get('/user/:username', function(req, res){
	var username = req.params.username; 
	
	console.log("username: " + username);
	mongo.connect(dblink, function(err, db){
		var user_collection = db.collection('users'); 	
		
		user_collection.find({ 'username' : username}).toArray(function(err, munchies){
			if(err){
				res.json({
					'msg' : "Failure"
				});
			}

			res.json(munchies);
		}); 
	});
});

app.post('/user', function(req, res){
	console.log("adding user...");
	var user = {
		'firstname' : req.body.fname, 
		'lastname' : req.body.lname, 
		'email': req.body.email, 
		'pw' : req.body.password
	}; 
	var address = {
		'email' : req.body.email, 
		'nick' : req.body.nick, 
		'phone' : req.body.phone, 
		'zip' : req.body.zip, 
		'addr' : req.body.addr,
		'city' : req.body.city, 
		'state' : req.body.state, 
		'current_password' : req.body.password
	};

	var us = {
		'firstname' : req.body.first_name, 
		'lastname' : req.body.last_name, 
		'email': req.body.email, 
		'pw' : req.body.pw, 
		'address' : {
			'email' : req.body.email, 
			'nick' : req.body.nick, 
			'phone' : req.body.phone, 
			'zip' : req.body.zip, 
			'addr' : req.body.addr,
			'city' : req.body.city, 
			'state' : req.body.state, 
			'current_password' : req.body.pw
		}
	};

	console.log(us);
	//put user into the mongo
	mongo.connect(dblink, function(err, db){
		console.log("adding to mogno");
		var user_collection = db.collection('users'); 
		user_collection.insert(us, function(err, docs){});
	});

	//add user to ordrin 
	console.log("adding to ordrin");
	ordrin.create_account(user);

	//add user address to ordrin 
	console.log('adding addrs');
	ordrin.create_addr(address, function(){
		res.json({ 'msg' : "ok" });	
	}); 
});



app.post('/munchies/:username', function(req, res){ 
	var restaurantName = req.body.rname; 
	var munchy = {
		'name' : req.body.name, 
		'email' : req.body.email, 
		'password' : req.body.password, 
		'rid' : req.body.rid, 
		'tray' : req.body.tray, 
		'tip' : req.body.tip, 
		'delivery_date' : req.body.delivery_date, 
		'delivery_time' : req.body.delivery_time, 
		'first_name' : req.body.first_name, 
		'last_name' : req.body.last_name, 
		'nick' : req.body.nick, 
		'card_nick' : req.body.card_nick
	};

	mongo.connect(dblink, function(err, db){
		var user_collection = db.collection('users'); 

		user_collection.find({ 'username': username }).toArray(function(err, munchies){
			if(err){
				res.json({
					'msg' : 'Failure'
				});
			}

			console.log(munchies);

		});

	});
}); 

app.post('/user', function(req, res){
	
});

app.post('/order', function(req, res){
	
});

app.listen(5000);
console.log("listening on 5k");
