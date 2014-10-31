var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var userSchema = Schema({
  name: String,
  tweets: [{ type: Schema.Types.ObjectId, ref: 'Tweet' }]
});

module.exports = mongoose.model('User', userSchema);