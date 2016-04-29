module.exports = {
	// the address that your server will use -- must be a valid address on your network!
	host: "192.168.1.26",
	// port number, generally 80 or 8080 would be commonly used
	port: 8080,

	// wemo switch/device addresses
	// In the server directory, run `node wemoDiscover.js` to find your device URLs
	wemoSwitch1: 'http://192.168.1.4:49153/setup.xml',
	wemoSwitch2: 'http://192.168.1.6:49153/setup.xml',

	// some other standard configs
	longDuration: 10000,
	duration: 7000,
	shortDuration: 3000,
	flashRate: 500,

	// set to true to show a few logging messages in the console
	verbose: false
};