const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputPath = path.join(__dirname, 'outputs');

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeJava = async (filepath, input = "") => {
    const jobId = path.basename(filepath).split(".")[0];

    const fileDir = path.dirname(filepath);
    const javaFilePath = path.join(fileDir, "Main.java");

    // Rename file to Main.java to match class name
    fs.renameSync(filepath, javaFilePath);

    const compileCommand = `javac "${javaFilePath}" -d "${outputPath}"`;

    return new Promise((resolve, reject) => {
        exec(compileCommand, (error, stdout, stderr) => {
            if (error) return reject({ error, stderr });
            if (stderr) return reject(stderr);

            const runCommand = `java -cp "${outputPath}" Main`;

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

module.exports = { executeJava };
