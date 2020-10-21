const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required:true},
  name: {type: String, required:true},
  position: {type: String, required:true},
  centerID: {type: String, required:true}
});

module.exports = mongoose.model('User', postSchema);
