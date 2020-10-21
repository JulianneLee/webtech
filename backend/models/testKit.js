const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  stock: {type: String, required:true},
  status: {type: String, required:true},
  centerID: {type: String, required:true}
});

module.exports = mongoose.model('testKit', postSchema);
