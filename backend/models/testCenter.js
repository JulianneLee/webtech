const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  managerID: {type: String, required:true}
});

module.exports = mongoose.model('Manager', postSchema);
