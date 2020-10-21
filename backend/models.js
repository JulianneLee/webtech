const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {type: String, required:true},
  password: {type: String, required:true},
  name: {type: String, required:true},
  position: {type: String, required:true},
  centerID: {type: String, required:false},
});

// const testKitSchema = mongoose.Schema({
//   name: {type: String, required:true},
//   stock: {type: String, required:true},
//   status: {type: String, required:true},
//   centerID: {type: String, required:true}
// });

// const test

module.exports = mongoose.model('User', userSchema);
// module.exports = mongoose.model('TestKit', testKitSchema);
