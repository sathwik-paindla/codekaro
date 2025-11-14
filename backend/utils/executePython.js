const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputPath = path.join(__dirname, 'outputs');

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executePython = async (filepath, input = "") => {
    const runCommand = `python "${filepath}"`;

    return new Promise((resolve, reject) => {
        const runProcess = exec(runCommand, (error, stdout, stderr) => {
            if (error) return reject({ error, stderr });
            if (stderr) return reject(stderr);

            resolve(stdout);
        });

        if (input) {
            runProcess.stdin.write(input);
            runProcess.stdin.end();
        }
    });
};

module.exports = { executePython };
