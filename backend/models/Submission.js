const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
        required: true
    },
    code: {
        type: String,
        required: true
    },
    language: {
        type: String,
        enum: ["cpp", "c", "java", "python"],
        required: true
    },
    verdict: {
        type: String,
        required: true
    },
    testResults: [
        {
            input: String,
            expectedOutput: String,
            userOutput: String,
            passed: Boolean
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Submission", submissionSchema);
