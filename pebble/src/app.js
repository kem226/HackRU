/**
 * Pebble Munchies
 * 
 * Order food from your watch
 */ 
var testJSON =
{
   "favoriteplaces": {
    "rname": "place1",
    "munchies": {
        "name": "placename1",
        "nickname": "ordernickname1",
    }
   /* "rname": "place2",
    "munchies": {
        "name": "placename2",
        "nickname": "ordernickname2",
    },
    "rname": "place3",
    "munchies": {
        "name": "placename3",
        "nickname": "ordernickname3",
    }*/
  }
};
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
  image: 'images/logosmall.png'
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
  title: 'Order Confirmation',
  font: 'gothic-12-bold',
  subtitle: 'Are you sure you would like to order ' + selection2,
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
  selection1 = e.itemIndex;
  for (var i = 0; i < items.favoriteplaces[selection1].length; i++)
  {
    favoritefoodsMenu.item(0, i, {title: items.favoriteplaces.munchies[i].nickname });
  }
  favoritefoodsMenu.show();
});
favoritefoodsMenu.on('select', function(e) {
  console.log('Event: \'select\' on favoritefoodsMenu');
  selection2 = e.itemIndex;
  posturl = 'http://pebblemunchies.me:5000/order/' + encodeURIComponent(JSON.stringify(items.favoriteplaces[selection1].munchies[selection2]));
  orderConfirmation.show();
});
orderConfirmation.on('click', 'up', function(e){
   ajax(
  {
    url: posturl,
    type: 'json'
  },
  function(sucMsg) {
    console.log('Sucessful Order!');
    orderConfirmation.hide();
    favoritefoodsMenu.hide();
    favoriteplacesMenu.hide();
  },
  function(error) {
    console.log('Order not sent');
    orderConfirmation.hide();
    favoritefoodsMenu.hide();
    favoriteplacesMenu.hide();
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
    //Testing
    data = testJSON;
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
      favoriteplacesMenu.item(0, j, { title: items.favoriteplaces[j].munchies.nick });
    }
    return items;
  },
  function(error) {
    //Testing
    var data = testJSON;
    
    //
    console.log('Error fetching user data: ' + error);
    var items;
    items = JSON.parse(data);
    favoriteplacesMenu = new UI.Menu({
      sections: [{
        title: 'Favorite Places:'
      }]
    });
    for (var j = 0; j < items.favoriteplaces.length; j++)
    {
      favoriteplacesMenu.item(0, j, { title: items.favoriteplaces[j].munchies.nick });
    }
    return items;
  }
);
else
  console.log('uData is empty, no user data request made');