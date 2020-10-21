const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {type: String, required:true},
  password: {type: String, required:true},
  name: {type: String, required:true},
  position: {type: String, required:true},
  centerID: {type: String, required:false},
});

const testKitSchema = mongoose.Schema({
  name: {type: String, required:true},
  stock: {type: String, required:true},
  status: {type: String, required:true},
  centerID: {type: String, required:true}
});

const testCaseSchema = mongoose.Schema({
  patientID: {type: String, required:true},
  type: {type: String, required:true},
  symptom: {type: String, required:true},
  officerID: {type: String, required:true},
  testCreated: {type: String, required:true},
  status: {type: String, required:true},
  result: {type: String, required:true},
  resultCreated: {type: String, required:true}
});

const testCenterSchema = mongoose.Schema({
  name: {type: String, required:true},
  managerID: {type: String, required:true}
});


module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('TestKit', testKitSchema);
module.exports = mongoose.model('TestCase', testCaseSchema);
module.exports = mongoose.model('TestCenter', testCenterSchema);
