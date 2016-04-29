/*
	Action file: blinks the screen red by loading the blink.html page

 	To use this, you open a browser and load `http://your_ip:port/`, for example http://192.168.1.10:8080. 
 	This will be the "red screen" which will flash for some actions. You can make this full screen. You
 	could do this from the server or from another device.
*/

var config = require('../config'),
	fs = require('fs'),
	statusFileName = 'currentState.txt',
	Wemo = require('wemo-client');

exports.getTask = function (params) {
	// params will be:
	// {action: 'blink', duration: config.duration}
	config.verbose && console.log('blinking screen for ' + params.duration + ' milliseconds'); // jshint ignore:line
	fs.writeFileSync(statusFileName, 'blink');
	setTimeout(function () {
		fs.writeFileSync(statusFileName, '');
	}, params.duration);
};