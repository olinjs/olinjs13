var mongoose = require('mongoose');

var tweetSchema = mongoose.Schema({
  tweet: String,
  created: Date,
  _creator : { type: mongoose.Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Tweet', tweetSchema);