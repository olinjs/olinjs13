# twitter

```
$ git clone https://github.com/olinjs/twitter.git
$ cd twitter
```

## Set up an application

Go to [https://dev.twitter.com/apps](https://dev.twitter.com/apps) and **Create a New Application**.

In addition to a name, description, and website, set the following Settings. Your Callback URL can be any valid public URL, it does not matter if you try using this from `localhost` later.

![http://i.imgur.com/e9BiHo9.png](http://i.imgur.com/e9BiHo9.png)


## Set your environment variables

Find your consumer key and secret:

![http://i.imgur.com/idEWVvM.png](http://i.imgur.com/idEWVvM.png)

Create a file named `.env` in this directory. Put in this file the following text, replace '...' with your tokens (don't include spaces around your `=` signs):

```
TWITTER_KEY=...
TWITTER_SECRET=...
```

Then run `foreman start`. (This was installed with Heroku toolbelt.) This reads environment variables from the `.env` file.


## Logging in with express and posting

```
$ npm install
$ foreman start
```

If you're getting OAuth errors, ensure your `process.env.TWITTER_KEY` and `process.env.TWITTER_SECRET` are set by logging them in Node.


### Using the Twitter API

**API Reference:** [https://dev.twitter.com/docs/api/1.1](https://dev.twitter.com/docs/api/1.1)


## Consuming the Twitter live stream

You can see an example of an endpoint that consumes a live Twitter stream. Run the following:

```
$ npm install carrier
```

Then add this code to the bottom of your `app.js`:

```
/**
 * Streaming example
 */

var carrier = require('carrier');

app.get('/stream', loginRequired, function (req, res) {
  req.api.stream('statuses/filter').post({
    track: ['obama', 'usa']
  }, function (err, stream) {
    carrier.carry(stream, function (line) {
      var line = JSON.parse(line);
      res.write(line.text + '\n');
    });
  });
})
```

Go to `/stream` in your browser and watch the OBAMAUSA tweets rollll right in.


## WEEEB sockets

Like hot pockets, but better

So if you notice in our [last commit](https://github.com/olinjs/twitter/tree/411ff1e1f291d70c1d61bda37cc5087cf61e2854) we got the twitter stream and were writing it to the browser with res.write. However, this means that you can't render the template because the page is never done rendering.

We could just have a /get_tweet endpoint that we call all the time which returns a new tweet, but we have no guarentee that it keeps up with Twitter's actual stream. 

The best way is to use [websockets](http://en.wikipedia.org/wiki/WebSocket) to get around this. In short, websockets are 2 way commnication channels between two endpoints. As long as the websocket is kept open, arbitrary amounts of data can be passed between the two endpoints.

We're going to use websockets to stream out twitter data from our server to our browser.

### Socket.io

[Socket.io](http://socket.io/) is a library that handles websockets (among other things) for you. In order to use it with express 3, we'll have to make some modifications to the way we're starting up our app.

```js
// app.js
var rem = require('rem')
  , express = require('express')
  , app = express()
  , path = require('path')
  , http = require('http')
  , browser_socket = null;

var server = app.listen(process.env.PORT || 3000);
var io = require('socket.io').listen(server);
```

Now we are passing the initialized http server over to the socket.io library. This makes us use websockets on the same port as our http server. We're also making `browser_socket` a global to hold onto our websocket client. This isn't good if we want to have more than 1 client, but it'll work for now.

Next we'll start up the socket connection. This requires code on both our server **and** our client (because socket.io has to talk between the two).

```
// app.js
io.on('connection', function(socket) {
  console.log("browser connected");
  browser_socket = socket;
});
```

As soon as our browser connects, we're going to grab its socket and keep it for later use.

```jade
// clientside code
script(src='/socket.io/socket.io.js')
script
  var socket = io.connect(); //connect the browser to the server
```

In our clientside code, we're going to include the `/socket.io/socket.io.js` script. This script is automatically added by the socket.io library. **You do not need to actually have the file there.** After it gets included, we can initialize a connection to the server through `io.connect()`

### Message passing using sockets

A socket from socket.io has an `emit` and a `on` function. If computer A was sending computer B a message in pesudo code it'll look something like

```
A.emit('special_message_name', {'data': 5});
B.on('special_message_name', function(data) {
  console.log(data.data);
});
```

So the sender has an `emit` and the receiver has a `on`. The first paramter should be unique to that particular call bewteen the emitter and the receiver. 
