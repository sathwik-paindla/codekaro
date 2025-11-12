// models/Problem.js
const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
    input: { type: String, required: true },
    expectedOutput: { type: String, required: true }
});

const problemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
    constraints: { type: String },
    sampleInput: { type: String },
    sampleOutput: { type: String },
    testCases: [testCaseSchema]
}, { timestamps: true });

module.exports = mongoose.model('Problem', problemSchema);

