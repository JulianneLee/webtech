const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const testKitSchema = mongoose.Schema({
  name: {type: String, required:true, unique:true},
  stock: {type: String, required:true},
  status: {type: String, required:true},
  centerID: {type: String, required:true}
});

testKitSchema.plugin(uniqueValidator)

module.exports = mongoose.model('TestKit', testKitSchema);
