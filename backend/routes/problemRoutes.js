const express = require('express');
const router = express.Router();
const {
    addProblem,
    getAllProblems,
    getProblemById,
    submitSolution
} = require('../controllers/problemController');

const auth=require('../middlewares/authMiddleware');

// Admin or instructor adds a problem
router.post('/add', addProblem);

// Fetch problems
router.get('/', getAllProblems);
router.get('/:id', getProblemById);

// Submit and evaluate code
router.post('/:problemId/submit', auth, submitSolution);

module.exports = router;
