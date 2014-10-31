var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'localhost');

var studentSchema = mongoose.Schema({
  name: String,
  done: Boolean,
  help: Boolean
});

var Student = mongoose.model('Student', studentSchema);

module.exports = Student;