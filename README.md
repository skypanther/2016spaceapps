# 2016 NASA Space Apps Challenge

##Enterprise Bridge Simulator

Our Space Apps Challenge entry is a USS Enterprise Bridge simulator. Using just your voice, sound a red alert, fire your phasers, or announce that the Eagle has landed on the moon.

See our project page at [Enterprise Bridge Simulator](https://2016.spaceappschallenge.org/challenges/space-station/launch-a-global-experience/projects/enterprise-bridge-simulator) or our web site at [www.EnterpriseBridge.us](http://www.EnterpriseBridge.us).

Our system was build for the Rochester Space Apps Challenge held at the Rochester Institute of Technology (RIT). Our four-person team represented the local AppRochester tech group and included (in alphabetical order):

* Tanweer Alam
* Todd Bernhard
* Bob Manard
* Tim Poulsen

Our solution used an iOS app to accept your voice input. It converts your speech to text, sending the resulting command to a NodeJS server which then played sound, turned on lights, and flashed the server's computer screen.

Technologies used include:

* ObjectiveC/Xcode
* NodeJS
* HTML/JavaScript
* NASA Sound Archives https://soundcloud.com/nasa/sets
* PolitePix OpenEars Open Source Speech Recognition http://www.politepix.com/openears/
* Belkin WeMo Home Automation Switches


Note: We are not including the sound files in this repository to avoid licensing issues. We don't necessarily have permissions to redistribute the files. But, you can get the necessary sounds from the [NASA Sound Archive](https://soundcloud.com/nasa/sets) and [SoundBoard](http://www.soundboard.com/).

## Requirements

* Computer supporting Node.js
* Speakers
* WeMo switches -- we used two, one connected to a light and one to a fan (to simulate the noise associated with an alert)
* iOS device, Xcode, and required provisioning profiles to install a development build of the app onto your device

## Setup instructions

### Get the files for this repo

Clone this repo to your computer:

1. Make a directory, as needed, and change into that directory
1. Run `git clone https://github.com/skypanther/2016spaceapps.git`
2. Change into the 2016spaceapps folder


### Compile and install the app

1. Open `OpenEarsSampleApp.xcodeproj` in Xcode
2. Open OpenEarsSampleApp, ViewController.m and edit the following line to match your server's IP address and port `NSString * server =@"http://172.20.10.7:8080/"` (this must match the address and port you configure in the server, see below).
2. Connect your device
3. Specify your device as the target and choose Run on device

### Find your WeMo device addresses

Make sure your WeMo switches are on the same network as your server and your iOS device. Update their firmware and configure them through the WeMo app as necessary. 

Then, from the `http_server` directory, run 

```node wemoDiscover.js```

This will print the IP addresses of your WeMo devices to the screen. You can press `Ctrl+C` to exit that program. You'll need those addresses in the next section.

### Set up and run the server

1. Install Node.js on your computer. We used 4.2.4, though newer versions should be supported.
2. Change to the `http_server` folder
3. Run `npm install` to install the dependencies for this project
4. Edit http_server.js and change the values of HOST and PORT. HOST must be a valid address on your network (localhost or 127.0.0.1 will not work) and PORT can be anything, though 8080 is common.
5. Edit actions/actionHandler.js to set the IP addresses of your WeMo devices
6. Make sure all your changes are saved.
7. Run `node http_server` to start the server

### Running the demo

1. Open a browser and load `http://your_ip:port/`, for example http://192.168.1.10:8080. This will be the "red screen" which will flash for some actions. You can make this full screen.
2. For testing, from another device or other browser window, open `http://your_ip:port/?action=<action>` for example http://192.168.1.10:8080?action=redalert. You can use any of the following:

* redalert
* intruder
* statusreport
* firephotontorpedos
* firephasers
* selfdestruct
* moonlanding

With the app running on your iOS device, speak one of the commands listed at the top of this page. After a moment, the sounds should play and lights flash. 

Voice commands supported:

* red alert
* intruder
* status report
* fire photon torpedos
* fire phasers
* self destruct
* moon landing
