var Student = require('../models/student');
/*
 * student functions
 */

exports.index = function(req, res){
  Student.findOne({name: req.session.student.name}, function (err, doc) {
    if (err)
      return console.log("error couldnt find student", req.session.student);
    // send it back
    res.render('student', {student: doc});
  });
  
};

exports.new = function(req, res){
  var student = new Student({ name: req.body.name, help: false, done: false});
  student.save(function (err) {
    if (err)
      return console.log("error couldnt save student", student, err);
    req.sessions.student = student;
    console.log("created student", student);
    res.send({'done': "created student"});
  });
};

exports.done = function(req, res){
  Student.update({ name:  req.session.student.name }, 
    { done: true }, function (err) {
      if (err)
        return console.log("error couldnt update student to done", err); 
      res.send({'done':"updated"});
    }
  );
};

exports.help = function(req, res){
  Student.update({ name: req.session.student.name }, 
    { help: true }, function (err) {
      if (err)
        return console.log("error couldnt update student to done", err); 
      res.send({'done':"updated"});
    }
  );
};