var Wemo = require('wemo-client');
var wemo = new Wemo();

function foundDevice(device) {

	if (device.deviceType === Wemo.DEVICE_TYPE.Switch) {
		console.log('Wemo Switch found: %s', device.friendlyName);
		console.log('URL ==> http://' + device.host + ':' + device.port + '/setup.xml');
	}
}
wemo.discover(foundDevice);