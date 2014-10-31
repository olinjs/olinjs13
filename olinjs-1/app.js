// Import modules.
var express = require('express');

// Create our application.
var app = express();

// Create the route for the path / and send a creepy response.
app.get('/', function (req, res) {
  res.send('<h1>Hello ' + (process.env.USER || 'Olin.js') + '!</h1>');
});

// Start serving webpages.
var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Open the address http://localhost:' + port + '/');
});