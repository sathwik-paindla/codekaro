const Problem = require('../models/Problem');
const { generateFile } = require('../utils/generateFile');
const { executeCpp } = require('../utils/executeCpp');

// ✅ Add a new problem
exports.addProblem = async (req, res) => {
    try {
        const { title, description, difficulty, constraints, sampleInput, sampleOutput, testCases } = req.body;

        if (!title || !description || !testCases || !Array.isArray(testCases)) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const problem = await Problem.create({
            title,
            description,
            difficulty,
            constraints,
            sampleInput,
            sampleOutput,
            testCases
        });

        res.status(201).json({
            message: 'Problem added successfully',
            problem
        });
    } catch (error) {
        console.error('Error adding problem:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ✅ Get all problems
exports.getAllProblems = async (req, res) => {
    try {
        const problems = await Problem.find().select('title difficulty');
        res.status(200).json(problems);
    } catch (error) {
        console.error('Error fetching problems:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ✅ Get single problem by ID
exports.getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.status(200).json(problem);
    } catch (error) {
        console.error('Error fetching problem:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ✅ Run and check user code for a problem
exports.submitSolution = async (req, res) => {
    try {
        const { code, language = 'cpp'} = req.body;
        const {problemId}=req.params;

        if (!code) {
            return res.status(400).json({ message: 'Code is required' });
        }

        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        const filePath = generateFile(language, code);
        let passedCount = 0;
        let testResults = [];

        for (const testCase of problem.testCases) {
            let output;
            if(language==='cpp')
            output = await executeCpp(filePath, testCase.input);
            if(language==='c')
            output = await executeC(filePath,testCase.input);
            if(language==='java')
            output = await executeJava(filePath,testCase.input);
            if(language==='python')
            output = await executePython(filePath,testCase.input);
            const trimmedOutput = output.trim();
            const expected = testCase.expectedOutput.trim();

            const passed = trimmedOutput === expected;
            if (passed) passedCount++;

            testResults.push({
                input: testCase.input,
                expectedOutput: expected,
                userOutput: trimmedOutput,
                passed
            });
        }

        const verdict =
            passedCount === problem.testCases.length
                ? 'Accepted'
                : `Failed ${problem.testCases.length - passedCount}/${problem.testCases.length} test cases`;

        res.status(200).json({
            problem: problem.title,
            totalCases: problem.testCases.length,
            passedCount,
            verdict,
            testResults
        });
    } catch (error) {
        console.error('Error submitting solution:', error);
        res.status(500).json({ message: 'Error during code execution' });
    }
};
