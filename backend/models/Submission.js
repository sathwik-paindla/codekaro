// models/Submission.js
const mongoose = require('mongoose');
const SubmissionSchema = new mongoose.Schema({
  problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  language: { type: String, required: true },
  sourceCode: { type: String, required: true },
  status: { type: String, enum: ['queued','running','accepted','wrong_answer','runtime_error','compile_error','time_limit_exceeded','partial'], default: 'queued' },
  score: { type: Number, default: 0 }, // for partial scoring
  runDetails: { type: Object, default: {} }, // hold logs/metrics
  createdAt: { type: Date, default: Date.now },
  finishedAt: Date
});
module.exports = mongoose.model('Submission', SubmissionSchema);
