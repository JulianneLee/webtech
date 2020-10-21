const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  testID: {type: String, required: true},
  patientID: {type: String, required: true},
  type: {type: String, required: true},
  symptom: {type: String, required:true},
  testCreated: {type: String, required:true},
  officerID: {type: String, required: true},
  status: {type: String, required:true},
  result: {type: String, required:true},
  resultCreated: {type: String, required:true}
});

module.exports = mongoose.model('Result', postSchema);
