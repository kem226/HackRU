var express = require('express'); 
var mongo = require('mongodb').MongoClient; 
var objectID = require('mongodb').ObjectID; 
var bodyParser = require('body-parser'); 
var ordrin = require('ordrin-api');
var request = require('request');

var app = express(); 
var dblink = process.env.MONGO_DB_LINK;
var ordrkey = process.env.ORDRIN_API_KEY;

var ordrin_api = new ordrin.APIs(ordrkey, ordrin.TEST);

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
		
		user_collection.find({ 'email' : username}).toArray(function(err, munchies){
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
		'datetime' : 'ASAP',
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
		'firstname' : req.body.fname, 
		'lastname' : req.body.lname, 
		'email': req.body.email, 
		'pw' : req.body.password, 
		'address' : {
			'datetime' : 'ASAP',
			'email' : req.body.email, 
			'nick' : req.body.nick, 
			'phone' : req.body.phone, 
			'zip' : req.body.zip, 
			'addr' : req.body.addr,
			'city' : req.body.city, 
			'state' : req.body.state, 
			'current_password' : req.body.password
		}
	};

	console.log(us);
	//put user into the mongo
	mongo.connect(dblink, function(err, db){
		console.log("adding to mogno");
		var user_collection = db.collection('users'); 
		user_collection.insert(us, function(err, docs){
			if(!err) console.log("added to mongo");		
		});
	});

	//add user to ordrin 
	console.log("adding to ordrin");
	ordrin_api.create_account(user, function(){});

	//add user address to ordrin 
	console.log('adding addrs');
	ordrin_api.create_addr(address, function(){
		res.json({ 'msg' : "ok" });	
	}); 
});

app.post('/cc/:email', function(req, res){
	var email = req.params.email;

	var cc = {
		'email' : email, 
		'nick' : req.body.nick, 
		'card_number' : req.body.card_number, 
		'card_cvc' : req.body.card_cvc, 
		'card_expiry' : req.body.card_expiry, 
		'bill_addr' : req.body.bill_addr, 
		'bill_city' : req.body.bill_city, 
		'bill_state' : req.body.bill_state, 
		'bill_zip' : req.body.bill_zip,
		'bill_phone' : req.body.bill_phone, 
		'current_password' : req.body.password
	};
	 
	ordrin_api.create_cc(cc, function(){ console.log("created stuff"); res.json({'msg' : 'ok' }); });
});

app.get('/delivery/:email', function(req, res){
	var email = req.params.email;
		
	mongo.connect(dblink, function(err, db){
		var user_collection = db.collection('users'); 
		
		user_collection.find({ 'email' : email }).toArray(function(err, docs){
			var user = docs[0]; 	
			var info = {
				datetime : 'ASAP',
				addr : user.address.addr, 
				city : user.address.city,
				zip : user.address.zip, 
			}; 
			console.log(info);
			
			var urlstring = "https://r-test.ordr.in/dl/" + info.datetime + '/' + info.zip + '/' + info.city + '/' + info.addr + '?_auth=1,'+ordrkey; 
			console.log(urlstring);	
			var uri = encodeURI(urlstring);
			console.log(uri);
			
			var details = [];	
			
			request.get(uri, function(err, response, body){
				var places = JSON.parse(body);
				for(place in places){
					var args = {}; 
					args.rid = places[place].id.toString(); 
					console.log(args);

					request.get("https://r-test.ordr.in/rd/" + args.rid + "?_auth=1,"+ordrkey, function(err, response, body){
						details.push(body);	
					});
				}
			}); 

			setTimeout(function(){res.json(details);}, 5000); 

		}); 
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

		user_collection.find({ 'email': username }).toArray(function(err, munchies){
			if(err){
				res.json({
					'msg' : 'Failure'
				});
			}

			console.log(munchies);

		});

	});
}); 

app.post('/order', function(req, res){
	
});

app.listen(5000);
console.log("listening on 5k");
