#!/usr/local/bin/node

//Lets require/import the HTTP module
var http = require('http');
var url = require('url');
var fs = require('fs');
var exec = require('child_process').exec;

//Lets define a port we want to listen to
const HOST = "172.20.10.7"; // this needs to be a valid address on your network
const PORT = 8080;

var actionHandler = new require('./actions/actionhandler');
var status;

//We need a function which handles requests and send response
function handleRequest(request, response) {
	var parsedUrl = url.parse(request.url, true);
	var action = parsedUrl.query['action'];
	var status = parsedUrl.query['status'];

	try {
		console.log("command received --> " + action);
		response.writeHead(200, {
			'Content-Type': 'text/html'
		});

		if (actionHandler[action]) {
			status = action;
			actionHandler[action](setStatus);
			response.end();
		} else if (status) {
			// return status
			var currentState = fs.readFileSync('currentState.txt');
			response.end(currentState);
		} else {
			var page = fs.readFileSync('blink.html');
			response.end(page);
			// response.end("Valid commands:\n" + commands.join('\n'));
		}

		// switch (action) {
		// case 'redalert':
		//  actionHandler.redalert();
		//  break;
		// case 'intruder':
		//  actionHandler.intruder();
		//  break;
		// }


	} catch (err) {
		response.end('Invalid command -- ' + err);
	}
}

function setStatus(state) {
	status = state;
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function () {
	//Callback triggered when server is successfully listening. Hurray!
	console.log("Server listening on: http://localhost:%s", PORT);
});