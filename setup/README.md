#Setup instructions
All of this should be done prior to Jan 22. We'll start off the class assuming that you have these things working.

##Get the OS
You'll need either Ubuntu 12.04 or OSX. It's not recommended to use Windows since we won't be able to help you debug if any issues come up.  

###Ubuntu
There are two options, either setting up Ubuntu as a dual boot/primary OS, or running it in a VM. If you don't already have Ubuntu, we recommend setting it up as VM. Follow [these instructions](http://www.psychocats.net/ubuntu/virtualbox). When choosing your ubuntu install you will need the desktop-1386 version.

###OSX
* Install [Xcode](https://developer.apple.com/xcode/)
* Install [homebrew](http://mxcl.github.com/homebrew/)

##Setting up everything else
* Get Chrome. In OSX [just get the binary](https://www.google.com/intl/en/chrome/browser/) and install it. To do this in Ubuntu, copy the following commands into your terminal, in order:

```
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -;
sudo sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list';
sudo apt-get update;
sudo apt-get install google-chrome-stable;
```
* Get node. In OSX [get the nodejs binary](http://nodejs.org/) and install it. In Ubuntu:

```
sudo add-apt-repository ppa:chris-lea/node.js;
sudo apt-get update;
sudo apt-get install nodejs;
sudo apt-get install npm;
```
* Get git. In OSX ```brew install git```. In ubuntu ```sudo apt-get install git```
* Install express by opening up a terminal and typing in ```sudo npm install express -g```
* Get a [Github account](https://github.com/)
* Setup the [public/private github ssh key](https://help.github.com/articles/generating-ssh-keys#platform-linux)
* Get a [Heroku account](http://www.heroku.com/)
* Do [steps 1-3](https://devcenter.heroku.com/articles/quickstart) to setup Heroku

##Making sure everything works
If you properly created everything, you should be able to open up a terminal and do the following:

```
git clone git://github.com/olinjs/setup.git setup; cd setup;
npm install;
heroku create;
git push heroku master;
```

If everything works, you should see a message like

```
...
...
...
Launching... done, v1
       http://<some random thing>.herokuapp.com deployed to Heroku
```

If you navigate to `http://<some random thing>.herokuapp.com` you should see "Hello world!".
