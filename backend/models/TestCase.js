// models/TestCase.js
const mongoose = require('mongoose');
const TestCaseSchema = new mongoose.Schema({
  problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  input: { type: String, required: true },
  output: { type: String, required: true },
  weight: { type: Number, default: 1 }, // scoring
  visible: { type: Boolean, default: false } // whether visible to users
});
module.exports = mongoose.model('TestCase', TestCaseSchema);
