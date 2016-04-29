# Enterprise Bridge Server

Setting up the server involves a few steps:

1. Set up [Node](https://nodejs.org/en/) on your computer.
2. Install the server's dependencies
2. Find your WeMo device addresses
3. Configure the project
4. Run it!

## Set up Node

### Raspberry Pi

If you're running **Raspbian**, Node (the old legacy version) will probably be installed already. But, it will be an old version. You'll need at least version 4.4 to run this server. Do this:

```
node -v # is less than 4.4 do the next steps
sudo apt-get remove node-legacy
# then do the wget and dpkg steps that follow
```

Now, to install Node, 

```
wget http://node-arm.herokuapp.com/node_latest_armhf.deb 
sudo dpkg -i node_latest_armhf.deb
```

**Note:** You should run `raspi-config` and update the sound configuration section as appropriate. For example, if you're plugging speakers into the headphone jack, you have to specify to force sound to the headphone port. If you don't, you'll get no sounds.

### Mac or Windows

Visit [nodejs.org](https://nodejs.org/en/) to download and install Node on your computer.

## Install dependencies

The server depends on a few Node packages that you'll need to install from NPM:

```
# if not there already
cd 2016spaceapps/server
# then install dependencies
npm install
```

## Find your WeMo device addresses

Make sure your WeMo switches are on the same network as your server and your voice input device. Update their firmware and configure them through the WeMo app as necessary. 

Then, from the `server` directory, run 

```node wemoDiscover.js```

This will print the IP addresses of your WeMo devices to the screen. You can press `Ctrl+C` to exit that program. You'll need those addresses in the next section.

## Configure the server

All of the configuration for this project is done in three files: config.js, blink.html, and voicecommands.js. You must at minimum edit the config.js file to match your network.

1. Edit config.js
2. Change the `host` value to match your IP address:
	* On Raspberry Pi, run `hostname -I`
	* On Mac, `ifconfig` and look for the `inet 192.168.1.26` type entry, probably under en0 or en1
	* On Windows, `ipconfig`
1. Change the `port` value if desired.
2. Update the WeMo device addresses using the values you found in the previous section.
3. Save your changes.
4. Edit blink.html. Update the IP address to match that of your server then save your changes.
3. Examine the voicecommands.js file. You don't have to change this file unless you want to customize the actions the server performs. See the next section for details.

#### Configuring voice commands:

In the voicecommands.js file, you'll see where we configure the various voice commands supported by the server. For example:

```javascript
redalert: [
	{action: 'playSound', sound: 'redalert.mp3'},
	{action: 'flashDevice', wemoDevice: config.wemoSwitch2, duration: config.duration},
	{action: 'turnOnDevice', wemoDevice: config.wemoSwitch1, duration: config.duration},
	{action: 'blink', duration: config.duration}
],
```

In this example, `redalert` will be an endpoint that your voice input app will hit after recognizing a "red alert" statement. When received, the server (in this case) will do four actions: play a sound, flash a device, turn on a device, and blink the screen.

You can add more commands by following the format of the existing entries. Each action type requires the parameters you see defined in the existing entries. 

The actual code for performing these actions is located in the files in the actions folder. Notice the name of those files matches the `action` value here. 

### Running the demo

The app has two parts:

* The endpoint you hit to kick off a voice action. Typically this is done from your voice input device. But, you can just open the right page from a browser for testing.
* An optional endpoint you can hit to show a flashing red screen. This is intended to be shown full screen / kiosk mode. During some actions, such as red-alert, this browser window will alternate between red and white to simulate a red alert warning display.

1. Open a browser and load `http://your_ip:port/`, for example http://192.168.1.10:8080. This will be the "red alert screen."
2. For testing, from another device or other browser window, open `http://your_ip:port/<action>` for example http://192.168.1.10:8080/redalert. 

By default, you can use any of the following:

* redalert
* intruder
* statusreport
* firephotontorpedos
* firephasers
* selfdestruct
* moonlanding

With the accompanying app running on your iOS device, speak one of the commands listed at the top of this page. After a moment, the sounds should play and lights flash. 

Voice commands supported:

* red alert
* intruder
* status report
* fire photon torpedos
* fire phasers
* self destruct
* moon landing