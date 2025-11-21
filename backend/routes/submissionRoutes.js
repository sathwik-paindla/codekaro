const express = require('express');
const router = express.Router();


const {
    getUserSubmissions,
    getProblemSubmissions,
    getSingleSubmission
} = require("../controllers/submissionController");

const auth=require("../middlewares/authMiddleware");

// user’s own submissions
router.get('/user', auth, getUserSubmissions);

// submissions for a specific problem
router.get('/problem/:problemId', getProblemSubmissions);

// fetch single submission
router.get('/:id', getSingleSubmission);

module.exports = router;
