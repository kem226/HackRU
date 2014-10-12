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

Settings.config(
	{ 
		url : "http://yourmomsintern.com/config.html"
	},
	function(e){
		console.log("in settings")
	}, 
	function(e){
		console.log(JSON.stringify(e.options)); 
	}
);
 
var main = new UI.Card({
	title: "Restaurants:" 
});

main.show();

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

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
