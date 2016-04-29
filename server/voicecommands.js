/*
	This is the registry, or configuration file of voice commands
 	supported by the server. This file defines an object whose properties
 	are the commands and values are the actions to be performed.

	It relies on configuration settings made in the config.js file
*/
var config = require('./config');

/*
	Here, we're defining an object whose properties (members) will be the endpoint the
	voice input system will send to this server. In other words, when you say "red alert"
	the app or whatever you use for voice input, will send a request to 
	http://this.server.ip:8080/redalert

	Each of these members defines an array of actions to perform. As you can see from the
	example, each voice input can trigger a series of actions. These will be performed in
	parallel. Each action type has its own set of properties:
		playSound - plays a sound from the public/sounds folder of the name you give for the duration you specify
		flashDevice - turns on/off the device you specify for the duration you specify
		turnOnDevice - turns on the device you specify for the duration you specify
		blink - specifies if & how long the "current state" web page will flash red, see the project readme for more info
*/
module.exports = {
	redalert: [
		{action: 'playSound', sound: 'redalert.mp3'},
		{action: 'flashDevice', wemoDevice: config.wemoSwitch2, duration: config.duration},
		{action: 'turnOnDevice', wemoDevice: config.wemoSwitch1, duration: config.duration},
		{action: 'blink', duration: config.duration}
	],
	intruder: [
		{action: 'playSound', sound: 'intruderalert.mp3'},
		{action: 'flashDevice', wemoDevice: config.wemoSwitch2, duration: config.shortDuration},
		{action: 'turnOnDevice', wemoDevice: config.wemoSwitch1, duration: config.shortDuration},
		{action: 'blink', duration: config.duration}
	],
	statusreport: [
		{action: 'playSound', sound: 'eagle_has_landed.mp3'}, 
	],
	moonlanding: [
		{action: 'playSound', sound: 'eagle_has_landed.mp3'}, 
	],
	firephotontorpedos: [
		{action: 'playSound', sound: 'tng_torpedo_clean.mp3'},
		{action: 'turnOnDevice', wemoDevice: config.wemoSwitch1, duration: 500},
		{action: 'blink', duration: config.shortDuration}
	],
	firephasers: [
		{action: 'playSound', sound: 'tng_phaser4_clean_top.mp3'},
		{action: 'turnOnDevice', wemoDevice: config.wemoSwitch1, duration: 500},
		{action: 'blink', duration: config.shortDuration}
	],
	selfdestruct: [
		{action: 'playSound', sound: 'selfdestruct11min_ep.mp3'},
		{action: 'flashDevice', wemoDevice: config.wemoSwitch2, duration: config.duration},
		{action: 'blink', duration: config.duration}
	],
};