const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const testCenterSchema = mongoose.Schema({
  name: {type: String, required:true, unique:true},
  managerID: {type: String, required:true}
});

testCenterSchema.plugin(uniqueValidator)

module.exports = mongoose.model('TestCenter', testCenterSchema);
