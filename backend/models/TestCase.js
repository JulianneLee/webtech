const mongoose = require('mongoose');

const testCenterSchema = mongoose.Schema({
  name: {type: String, required:true},
  managerID: {type: String, required:true}
});

module.exports = mongoose.model('TestCenter', testCenterSchema);
