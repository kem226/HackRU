/**
 * Pebble Munchies
 * 
 * Order food from you watch
 */ 

var UI = require('ui');
var Vector2 = require('vector2');
var Settings = require('settings'); 
var username = Settings.data('username'); 
var password = Settings.data('password');
var ajax = require('ajax');
//Fetch user settings
Settings.config(
	{ 
		url : "http://yourmomsintern.com/config.html"
	},
	function(e){
    console.log("Settings fetched:" + e);
	}, 
	function(e){
		console.log(JSON.stringify(e.options)); 
	}
);
var favoriteplaces = new UI.Menu({
  fullscreen: true,
  backgroundColor: 'white'
});
var main = new UI.Window({
  fullscreen: true,
  backgroundColor: 'white'
});
var logo = new UI.Image({
  position: new Vector2(0, 0),
  size: new Vector2(144, 60),
  backgroundColor: 'clear',
  image: 'images/logosmall.png',
});
var text1 = new UI.Text({ 
  text: "Order ->",
  font: 'gothic-18-bold',
  color: 'white',
  position: new Vector2(0, 70),
  size: new Vector2(144, 20), 
  textAlign: 'center'
});
var text2 = new UI.Text({ 
  text: "View Settings ->",
  font: 'gothic-18-bold',
  color: 'white',
  position: new Vector2(0, 140),
  size: new Vector2(144, 20), 
  textAlign: 'center'
});
main.add(logo);
main.add(text1);
main.add(text2);
main.show();
main.on('click', 'select', function(e) {
  favoriteplacesMenu.show();
});
favoriteplaces.on('click', 'select', function(e) {
  favoritefoodsMenu.show();
});
var uData  = Settings.data();
//Fetch user data
var favoriteplacesMenu = new UI.Menu();
var favoritefoodsMenu = new UI.Menu();
ajax(
  {
    url: 'http://api.pebblemunchies.me/munchies/' + uData.username,
    type: 'json'
  },
  function(data) {
    console.log('Successfully fetched user data');
    for(var i = 0; i < data.length; i++) {
      console.log(data[i].title + " | " + data[i].subtitle);
    }
    var items = [];
    items = JSON.parse(data);
    var favoriteplacesMenu = new UI.Menu({
      sections: [{
        title: 'Favorite Places:',
        //items: items.favoriteplaces
      }]
    });
    var favoritefoodsMenu = new UI.Menu({
      sections: [{
        title: 'Favorite Foods',
        //items: items.favoritefoods
      }]
    });
    return items;
  },
  function(error) {
    console.log('Error fetching user data: ' + error);
    var items;
    return items;
  }
);
/*
main.on('click', 'select', function(e) {
	setting.config(
		{
			url: 'https://google.com'
		}, 
		function(e){
			console.log("I don't know what this does.");
		}, 
		function(e){
		
		}
	);
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});
*/
