// npm install express rem
var rem = require('rem')
  , express = require('express')
  , app = express()
  , path = require('path')
  , http = require('http')
  // , server = http.createServer(app)
  , browser_socket = null;

var server = app.listen(process.env.PORT || 3000);;

/**
 * Express.
 */

app.configure(function () {
  // app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('secret', process.env.SESSION_SECRET || 'terrible, terrible secret')
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser(app.get('secret')));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
  app.set('host', 'localhost:' + process.env.PORT || 3000);
  app.use(express.errorHandler());
});

app.configure('production', function () {
  app.set('host', process.env.HOST);
});

/**
 * Setup Twitter.
 */

var twitter = rem.connect('twitter.com').configure({
  key: process.env.TWITTER_KEY,
  secret: process.env.TWITTER_SECRET
});

var oauth = rem.oauth(twitter, 'http://' + app.get('host') + '/oauth/callback');

app.get('/login/', oauth.login());

app.use(oauth.middleware(function (req, res, next) {
  console.log("The user is now authenticated.");
  res.redirect('/');
}));

app.get('/logout/', oauth.logout(function (req, res) {
  res.redirect('/');
}));

// Save the user session as req.user.
app.all('/*', function (req, res, next) {
  req.api = oauth.session(req);
  next();
});

/**
 * Routes
 */

function loginRequired (req, res, next) {
  if (!req.api) {
    res.redirect('/login/');
  } else {
    next();
  }
}

app.get('/', loginRequired, function (req, res) {
  req.api('account/verify_credentials').get(function (err, profile) {
    res.send('Hi ' + profile.screen_name + '! <form action="/status" method="post"><input name="status"><button>Post Status</button></form>');
  });
});

app.post('/status', loginRequired, function (req, res) {
  req.api('statuses/update').post({
    status: req.body.status
  }, function (err, json) {
    if (err) {
      res.json({error: err});
    } else {
      res.redirect('http://twitter.com/' + json.user.screen_name + '/status/' + json.id_str);
    }
  });
})

app.listen(app.get('port'), function () {
  console.log('Listening on http://' + app.get('host'))
});

/**
 * Streaming example
 */

var carrier = require('carrier');

app.get('/stream', loginRequired, function (req, res) {
  // req.api.stream('statuses/filter').post({
  //   track: ['obama michelle', 'usa']
  // }, function (err, stream) {
  emit_stream(req);
  res.render('stream');
});

function emit_stream(req) {
  if (browser_socket != null) {
    console.log("browser", browser_socket);
    req.api.stream('statuses/sample').get(function (err, stream) {
      carrier.carry(stream, function (line) {
        var line = JSON.parse(line);
        // res.write(line.text + '\n');
        browser_socket.emit('twitter_stream', {'data': line.text});
      });
    });
  }
}

// this works for one connection
var io = require('socket.io').listen(server);
io.on('connection', function(socket) {
  console.log("browser connected");
  browser_socket = socket;
});