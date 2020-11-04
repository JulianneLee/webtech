const mongoose = require('mongoose');

const testKitSchema = mongoose.Schema({
  name: {type: String, required:true},
  stock: {type: String, required:true},
  status: {type: String, required:true},
  centerID: {type: String, required:true}
});

module.exports = mongoose.model('TestKit', testKitSchema);
