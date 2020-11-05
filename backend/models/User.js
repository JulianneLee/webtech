const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {type: String, required:true, unique:true},
  password: {type: String, required:true},
  name: {type: String, required:true},
  position: {type: String, required:true},
  centerID: {type: String, required:false},
});

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema);
