const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputPath = path.join(__dirname, 'outputs');

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeC = async (filepath, input = "") => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);

    const compileCommand = `gcc "${filepath}" -o "${outPath}"`;

    return new Promise((resolve, reject) => {
        exec(compileCommand, (error, stdout, stderr) => {
            if (error) {
                return reject({ error, stderr });
            }
            if (stderr) {
                return reject(stderr);
            }

            const runCommand = `${outPath}`;
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
    });
};

module.exports = { executeC };
