
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , admin = require('./routes/admin')
  , student = require('./routes/student')
  , mongoose = require('mongoose')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.use(express.cookieParser());
app.use(express.session({ secret: process.env.SECRET || 'fake_secret'}));
app.use(app.router);

app.get('/', routes.index);

app.get('/students/:student', student.index);
app.post('/students/new', student.new);
app.post('/students/:student/done', student.done);
app.post('/students/:student/help', student.help);

app.get('/admin', admin.show);
app.post('/admin/clear', admin.clear);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
