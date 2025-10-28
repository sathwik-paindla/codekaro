// models/Problem.js
const mongoose = require('mongoose');
const ProblemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug:  { type: String, required: true, unique: true }, // for URLs
  statement: { type: String, required: true }, // markdown/HTML
  inputSpec: String,
  outputSpec: String,
  timeLimitMs: { type: Number, default: 1000 },
  memoryLimitKb: { type: Number, default: 65536 },
  difficulty: { type: String, enum:['easy','medium','hard'], default: 'easy' },
  tags: [String],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  published: { type: Boolean, default: false }
});
module.exports = mongoose.model('Problem', ProblemSchema);
