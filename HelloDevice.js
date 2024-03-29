//First, we'll require the 'http' library to use later for calling a 3rd party webservice
var http = require("http");

//Let's say your script is expecting an http request parameter called 'myName',
//this is how you can retrieve it
var name = request.parameters.myName

//Suppose you want to make that value available to future running script instances
//you can store it in a persistent variable
if (name != null) storage.local.theName = name

//The value of 'storage.local.theName' is automatically stored in a persistent database.
//So from now on, it will be available to all instances of this script to read an modify,
//therefore you will not have to pass it as an http request parameter again.

//Persistent variables that start with 'storage.global' work the same 
//but are available to all running script instances in your account .


//Now let's obtain the client IP from the http request header
var ip = request.headers["x-forwarded-for"];

//Let's see now how to make a request to a 3rd party web service

//The request object below will be used to make an HTTP call that will do a country lookup based on the IP 
var requestObject = {
 "url": "https://scriptr.io/hello",
 "params": {"name": storage.local.theName, "ip": ip},
 "method": "POST" // the method is optional, it defaults to GET.
}

//... and now we issue the request
var country = null;
var response = http.request(requestObject);
if(response.status == "200"){
 var result = JSON.parse(response.body);
 country = result.country;
}

//Finally, let's construct the response that this script will return
var scriptResponse = "Hello";
if(storage.local.theName != null) scriptResponse += " " + storage.local.theName;
if(country != null) scriptResponse += " from " + country;
scriptResponse += "!";

return scriptResponse;
