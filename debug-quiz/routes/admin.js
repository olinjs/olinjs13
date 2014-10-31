var Student = require('../models/student');

/*
 * Admin dashboard
 */

exports.show = function(req, res){
  Student.find({}, function (err, docs) {
    if (err)
      return console.log("error", err);

    var done = docs.filter(function (doc) {
      if (!doc.done) return doc;
    });

    var help = docs.filter(function (doc) {
      if (!doc.help) return doc;
    });

    // send it back
    res.render('admin', {done: done, help: help});
  });
};

exports.clear = function(req, res){
  Student.update({}, {$set: {done: false, help: false}}, 
    {multi: true}, function (err, number){
      if (err)
        return console.log("error", err);
      res.send({});
  });
};