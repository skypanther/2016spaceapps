var async = require('async'),
	config = require('./config'),
	exec = require('child_process').exec,
	fs = require('fs'),
	http = require('http'),
	statusFileName = 'currentState.txt',
	url = require('url');


// bring in our voice commands configuration file
var voicecommands = require('./voicecommands');
var status;

//We need a function which handles requests and send response
function handleRequest(request, response) {
	var parsedUrl = url.parse(request.url, true);
	// get the pathname portion of the url, turned into an array
	// we will be using the first one, but future versions might use
	// additional path name values as options
	// e.g. http://localhost/redalert/repeat would become ['redalert', 'repeat']
	var pathnames = parsedUrl.pathname.slice(1).split('/');
	// we also have a special url http://localhost/?status=status used
	// to flash the screen red for some actions
	var status = parsedUrl.query.status;

	try {
		/*
			voicecommands is an object, whose keys are the endpoints you hit after
		 	processing voice input. We're going to look for a key in the object to
		 	match the endpoint called.
		*/
		var actions = voicecommands[pathnames[0]],
			tasks = [];

		if (actions) {
			// actions will be an array if the endpoint exists in the voicecommands object
			config.verbose && console.log("command received --> " + pathnames[0]); // jshint ignore:line
			actions.forEach(function (act) {
				var fn = require('./actions/' + act.action).getTask(act);
				if (typeof fn === 'function') {
					tasks.push(fn);
				}
			});
			if (tasks.length) {
				async.parallel(tasks, function (err, data) {
					if (err) {
						console.error(err);
					}
				});
			}
			response.end();
		} else if (status) {
			// if someone is hitting the special status endpoint, we will return
			// the status code, which might flash the screen red
			response.writeHead(200, {
				'Content-Type': 'text/plain'
			});
			response.end(fs.readFileSync(statusFileName));
		} else {
			// finally, if it's none of the above, serve up the blink.html page
			// which uses the status above to create the flashing red effect
			response.writeHead(200, {
				'Content-Type': 'text/html'
			});
			var page = fs.readFileSync('blink.html');
			response.end(page);
		}

	} catch (error) {
		response.end('Invalid command -- ' + error);
	}
}

// Create the http server
var server = http.createServer(handleRequest);
// and start it
server.listen(config.port, config.host, function () {
	console.log("Server listening on: http://%s:%s", config.host, config.port);
});