
$(document).ready(function() {
    console.log( "ready!" );
    if (localStorage.getItem('username')) {
         window.location.replace("http://pebblemunchies.me/restaurants.html");
    }
});
  
function loginSubmit(){
    
    document.getElementById("lemail").style.color = "red";
    
    var username = document.getElementById("lemail").value;
    var password = document.getElementById("lpass").value;
    
    var requestResponse = loginRequest(username,password);
    
    
    if (requestResponse === "ok") {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        window.location.replace("http://pebblemunchies.me/restaurants.html");
    }
     
}
  
function signupSubmit(){
    var username = document.getElementById("semail").value;
    var password = document.getElementById("spass").value;
    var addr = document.getElementById("addr").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var zip = document.getElementById("zip").value;
    var phone = document.getElementById("phone").value;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var nick = document.getElementById("nick").value;
    
    var requestResponse = signupRequest(username,password,addr,city,state,zip,phone,fname,lname,nick);
    
    
    if (requestResponse === "ok") {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        window.location.replace("http://pebblemunchies.me/restaurants.html");
    }
     
}
  

  
function loginRequest(username,password) {

  muchiesAPI();
  
  var request = new XMLHttpRequest();
  
  request.open("POST","http://pebblemunchies.me:5000/login",false);
  request.setRequestHeader("Content-type","application/json");
  
  var user = {
    'username' : username,
    'password' : password
  }
  
  request.send(JSON.stringify(user));
  
  return request.responseText;

}

 
function signupRequest(username,password,addr,city,state,zip,phone,fname,lname,nick) {
    
  muchiesAPI();
  var request = new XMLHttpRequest();
  request.open("POST","http://pebblemunchies.me:5000/user",false);
  request.setRequestHeader("Content-type","application/json");
  
  var user = {
    'fname' : fname,
    'lname' : lname,
    'email' : username,
    'password' : password,
    'addr' : addr,
    'state' : state,
    'city' : city,
    'zip' : zip,
    'phone' : phone,
    'nick' : nick
    
  }
  
  request.send(JSON.stringify(user));
  
  return request.responseText;
    
}


  

