const Submission = require("../models/Submission");

exports.getUserSubmissions = async (req, res) => {
    try {
        const userId = req.user.id;

        const submissions = await Submission.find({ userId })
            .populate("problemId", "title")
            .sort({ createdAt: -1 });

        res.status(200).json(submissions);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching user submissions" });
    }
};

exports.getProblemSubmissions = async (req, res) => {
    try {
        const { problemId } = req.params;

        const submissions = await Submission.find({ problemId })
            .populate("userId", "firstname lastname email")
            .sort({ createdAt: -1 });

        res.status(200).json(submissions);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching submissions" });
    }
};

exports.getSingleSubmission = async (req, res) => {
    try {
        const { id } = req.params;

        const submission = await Submission.findById(id)
            .populate("problemId", "title")
            .populate("userId", "firstname lastname email");

        if (!submission)
            return res.status(404).json({ message: "Submission not found" });

        res.status(200).json(submission);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching submission" });
    }
};
