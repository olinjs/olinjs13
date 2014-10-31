var User = require('../models/user.js');

exports.new = function (req, res){
  res.render('user');
}

exports.create = function(req, res){
  // check if a user exists
  User.findOne({name: req.body.name}, function (err, doc) {
    if (err)
      return console.log("error logging in", err);

    if (!doc) {
      // create the user 
      var user = new User({name: req.body.name});
      user.save(function (err) {
        if (!err) {
          return login(req, res, user);
        } else {
          console.log("couldn't create new user", err);
        }
      });
    } else {
      // we already have this user, just log them in
      return login(req, res, doc);
    }
  });
};

function login (req, res, user){
  req.session.user = user;
  return res.redirect('/');
}