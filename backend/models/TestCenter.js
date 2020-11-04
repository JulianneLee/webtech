const mongoose = require('mongoose');

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

module.exports = mongoose.model('TestCase', testCaseSchema);
