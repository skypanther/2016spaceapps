/*
	Action file: flash a device (turn it on/off rapidly)
*/

var config = require('../config'),
	Wemo = require('wemo-client');

exports.getTask = function (params) {
	// params will be:
	// {action: 'flashDevice', wemoDevice: config.wemoSwitch2, duration: config.shortDuration},
	config.verbose && console.log('flashDevice for ' + params.wemoDevice); // jshint ignore:line
	var wemo = new Wemo();
	var howLong = params.duration || config.duration;
	wemo.load(params.wemoDevice, function (device) {
		if (device.deviceType === Wemo.DEVICE_TYPE.Switch) {
			var state = 'off';
			var client = this.client(device);

			// Toggle the switch every half-second (default)
			var interval = setInterval(function () {
				client.setBinaryState(state === 'on' ? 0 : 1);
			}, config.flashRate);
			setTimeout(function () {
				clearInterval(interval);
				client.setBinaryState(0);
			}, howLong);
		}
	});
};