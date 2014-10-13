
$(document).ready(function() {
    console.log( "ready!" );
   // if (localStorage.getItem('email')) {
	
  var request = new XMLHttpRequest();
  
 // var email = localStorage.getItem('email');
  
  request.open("GET","http://pebblemunchies.me:5000/delivery/"+"kapidiamush@gmail.com",false);
  
  request.send();
  
  var obj = JSON.parse(request.responseText);
    var result = obj.result;
  
   // }else {
       //window.location.replace("http://pebblemunchies.me/login.html");
 //   }
    
//var result = [{name:"rest1"}, {name: "rest3"}, {name: "rest4"}, {name: "rest5"}, {name: "rest6"}];
var i = 0;
for (var restaurant in result) {
  var startdivs = '<div class="panel panel-default"><div class="panel-heading">' +
  '<a class="panel-title" data-toggle="collapse" data-parent="#panel-878193" href="#panel-element-' +  i + ' ">' +
  result[i].name + '</a></div><div id="panel-element-' + i + '" class="panel-collapse collapse">' +
		     '<div class="panel-body">' + result[i].name ;
		    
		    /*<table class="table table-hover table-condensed">
				<thead>
					<tr>
						<th>
							#
						</th>
						<th>
							Item
						</th>
						<th>
							Payment Taken
						</th>
						<th>
							Price
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							1
						</td>
						<td>
							TB - Monthly
						</td>
						<td>
							01/04/2012
						</td>
						<td>
							Default
						</td>
					</tr>
					<tr class="active">
						<td>
							1
						</td>
						<td>
							TB - Monthly
						</td>
						<td>
							01/04/2012
						</td>
						<td>
							Approved
						</td>
					</tr>
					<tr class="success">
						<td>
							2
						</td>
						<td>
							TB - Monthly
						</td>
						<td>
							02/04/2012
						</td>
						<td>
							Declined
						</td>
					</tr>
					<tr class="warning">
						<td>
							3
						</td>
						<td>
							TB - Monthly
						</td>
						<td>
							03/04/2012
						</td>
						<td>
							Pending
						</td>
					</tr>
					<tr class="danger">
						<td>
							4
						</td>
						<td>
							TB - Monthly
						</td>
						<td>
							04/04/2012
						</td>
						<td>
							Call in to confirm
						</td>
					</tr>
				</tbody>
			</table>
		    */
		    
	 startdivs = startdivs + '</div></div></div>';

				
  // create my text
//var sHeader = document.createTextNode(startdivs);

// create an element for the text and append it
//var spanHeader = document.createElement('span');
//spanHeader.appendChild(sHeader);


// grab a reference to the div header
var divHeader = document.getElementById('panel-878193');
// append the new element to the header
divHeader.innerHTML = divHeader.innerHTML + startdivs;

console.log( "done!" );

i= i+1;
}


});
  

