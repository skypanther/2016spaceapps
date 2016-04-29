/*
	Action file: plays a sound
*/

var config = require('../config'),
	player = require('play-sound')(opts = {});


exports.getTask = function (params) {
	// params will be:
	// {action: 'playSound', sound: 'redalert.mp3'},
	config.verbose && console.log("playing sound: " + params.sound); // jshint ignore:line
	player.play('public/' + params.sound, function (err) {});
};