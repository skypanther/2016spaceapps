var player = require('play-sound')(opts = {})
var Wemo = require('wemo-client');
var fs = require('fs');
var DURATION = 7000;
var fanIP = 'http://172.20.10.4:49153/setup.xml';
var lightIP = 'http://172.20.10.6:49153/setup.xml';
var statusFileName = 'currentState.txt';

module.exports = {
	redalert: function () {
		fs.writeFileSync(statusFileName, 'redalert');
		playSound('public/redalert.mp3');
		flashDevice(lightIP);
		turnOnDevice(fanIP);
		setTimeout(function () {
			fs.writeFileSync(statusFileName, '');
		}, DURATION)
	},
	intruder: function () {
		playSound('public/intruderalert.mp3');
		flashDevice(lightIP);
		turnOnDevice(fanIP);
		setTimeout(function () {
			fs.writeFileSync(statusFileName, '');
		}, DURATION)
	},
	statusreport: function () {
		playSound('public/eagle_has_landed.mp3');
		setTimeout(function () {
			fs.writeFileSync(statusFileName, '');
		}, DURATION)
	},
	firephotontorpedos: function () {
		playSound('public/tng_torpedo_clean.mp3');
		turnOnDevice(lightIP);
		setTimeout(function () {
			turnOffDevice(lightIP);
		}, 500);
		setTimeout(function () {
			fs.writeFileSync(statusFileName, '');
		}, DURATION)
	},
	firephasers: function () {
		playSound('public/tng_phaser4_clean_top.mp3');
		setTimeout(function () {
			fs.writeFileSync(statusFileName, '');
		}, DURATION)
	},
	selfdestruct: function () {
		playSound('public/selfdestruct11min_ep.mp3');
		setTimeout(function () {
			fs.writeFileSync(statusFileName, '');
		}, DURATION)
	},
	moonlanding: function () {
		playSound('public/eagle_has_landed.mp3');
		setTimeout(function () {
			fs.writeFileSync(statusFileName, '');
		}, DURATION)
	}
};

function playSound(sound) {
	player.play(sound, function (err) {}) // $ mplayer foo.mp3  
}

function turnOnDevice(deviceURL) {
	var wemo = new Wemo();
	wemo.load(deviceURL, function (device) {
		if (device.deviceType === Wemo.DEVICE_TYPE.Switch) {
			console.log('Wemo Switch found: %s', device.friendlyName);

			var state = 'off';
			var client = this.client(device);

			// The switch changed its state
			client.on('binaryState', function (value) {
				state = (value === '1') ? 'on' : 'off';
				console.log('Switch %s is %s', this.device.friendlyName, state);
			});
			client.setBinaryState(1);
			setTimeout(function () {
				client.setBinaryState(0);
			}, DURATION);
		}
	});
}

function turnOffDevice(deviceURL) {
	var wemo = new Wemo();
	wemo.load(deviceURL, function (device) {
		if (device.deviceType === Wemo.DEVICE_TYPE.Switch) {
			console.log('Wemo Switch found: %s', device.friendlyName);

			var state = 'off';
			var client = this.client(device);

			// The switch changed its state
			client.on('binaryState', function (value) {
				state = (value === '1') ? 'on' : 'off';
				console.log('Switch %s is %s', this.device.friendlyName, state);
			});
			client.setBinaryState(0);
		}
	});
}

function flashDevice(deviceURL) {
	var wemo = new Wemo();
	wemo.load(deviceURL, function (device) {
		if (device.deviceType === Wemo.DEVICE_TYPE.Switch) {
			console.log('Wemo Switch found: %s', device.friendlyName);

			var state = 'off';
			var client = this.client(device);

			// The switch changed its state
			client.on('binaryState', function (value) {
				state = (value === '1') ? 'on' : 'off';
				console.log('Switch %s is %s', this.device.friendlyName, state);
			});
			// Toggle the switch every two seconds
			var interval = setInterval(function () {
				client.setBinaryState(state === 'on' ? 0 : 1);
			}, 500);
			setTimeout(function () {
				clearInterval(interval);
				client.setBinaryState(0);
			}, DURATION);
		}
	});
}