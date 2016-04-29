/*
	Action file: turns on a device 	
*/

var config = require('../config'),
	Wemo = require('wemo-client');

exports.getTask = function (params) {
	// params will be:
	// {action: 'turnOnDevice', wemoDevice: config.wemoSwitch1, duration: config.duration},
	config.verbose && console.log('turnOnDevice for ' + params.wemoDevice); // jshint ignore:line
	var wemo = new Wemo();
	var howLong = params.duration || config.duration;
	wemo.load(params.wemoDevice, function (device) {
		if (device.deviceType === Wemo.DEVICE_TYPE.Switch) {
			var state = 'off';
			var client = this.client(device);
			// Listener for the Wemo switch changing state. You could do something interesting in here.
			// client.on('binaryState', function (value) {
			// 	state = (value === '1') ? 'on' : 'off';
			// 	console.log('Switch %s is %s', this.device.friendlyName, state);
			// });

			client.setBinaryState(1);
			setTimeout(function () {
				client.setBinaryState(0);
			}, howLong);
		}
	});
};