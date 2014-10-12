/**
 * Pebble Munchies
 * 
 * Order food from your watch
 */ 
var UI = require('ui');
var Vector2 = require('vector2');
var Settings = require('settings'); 
var ajax = require('ajax');
var items;
var username;
var password;
var selection1;
var selection2;
//Fetch user settings
Settings.config(
	{ 
		url : "http://yourmomsintern.com/config.html"
	},
	function(e){
    console.log("Settings fetched:" + e);
    username = Settings.data('username'); 
    password = Settings.data('password');
	}, 
	function(e){
		console.log(JSON.stringify(e.options)); 
	}
);
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
console.log('main menu displayed');
var favoriteplacesMenu = new UI.Menu({
  sections: [{
    items: [{
      font: 'gothic-12-bold',
      title: 'Favorite Places Menu'
    }]
  }]
});
var favoritefoodsMenu = new UI.Menu({
  sections: [{
   items: [{
      font: 'gothic-12-bold',
      title: 'Favorite Foods Menu'
    }]
  }]
});
var orderConfirmation = new UI.Card({
  action: {
    up: 'images/Yes_action.png',
    down: 'images/No_action.png'
  }
});
main.on('click', 'select', function(e) {
  console.log('Event: \'select\' on main');
  favoriteplacesMenu.show();
});
favoriteplacesMenu.on('select', function(e) {
  console.log('Event: \'select\' on foodplacesMenu');
  for (var i = 0; i < items.favoriteplaces[selection1].length; i++)
  {
    favoritefoodsMenu.item(0, i, { title: items.favoriteplaces.munchies[i].nickname });
  }
  favoritefoodsMenu.show();
});
orderConfirmation.on('click', 'up', function(e){
   ajax(
  {
    url: 'http://pebblemunchies.me:5000/order/' + encodeURIComponent(items.favoriteplaces[selection1].munchies[selection2]),
    type: 'json'
  },
  function(sucMsg) {
    console.log('Successfully fetched user data');
  },
  function(error) {
    console.log('Error fetching user data: ' + error);
    var items;
    return items;
  });
});
var isData  = Settings.data();
//Fetch user data
if (isData)
  ajax(
  {
    url: 'http://api.pebblemunchies.me:5000/munchies/' + username,
    type: 'json'
  },
  function(data) {
    console.log('Successfully fetched user data');
    for(var i = 0; i < data.length; i++) {
      console.log(data[i].title + " | " + data[i].subtitle);
    }
    var items = [];
    items = JSON.parse(data);
    favoriteplacesMenu = new UI.Menu({
      sections: [{
        title: 'Favorite Places:'
      }]
    });
    for (var j = 0; j < items.favoriteplaces.length; j++)
    {
      favoriteplacesMenu.item(0, j, { title: items.favoriteplaces[j].munchies.nick, subtitle: items.favoriteplaces[j].munchies.delivery_time});
    }
    favoritefoodsMenu = new UI.Menu({
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
else
  console.log('uData is empty, no user data request made');

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