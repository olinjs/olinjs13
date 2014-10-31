
/**
 * Module dependencies.
 */

var express = require('express')
  , user = require('./routes/user')
  , tweets = require('./routes/tweets')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

var app = express();

app.configure(function(){
  mongoose.connect(process.env.MONGOLAB_URI || 'localhost');
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('secret_key'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', tweets.list);
app.get('/users/new', user.new);
app.post('/users/new', user.create);
app.get('/tweets/more', tweets.more);

app.post('/tweets/:user', tweets.new);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
