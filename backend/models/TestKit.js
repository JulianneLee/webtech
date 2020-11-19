const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const testKitSchema = mongoose.Schema({
  name: {type: String, required:true},
  stock: {type: String, required:true},
  centerID: {type: String, required:true}
});

testKitSchema.index({name: 1, centerID: 1}, {unique: true});

testKitSchema.plugin(uniqueValidator)

module.exports = mongoose.model('TestKit', testKitSchema);
